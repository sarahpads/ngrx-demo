# @ngrx Demo

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.20.

I shamefully lifted the design concepts from [Seedlip Drink](https://seedlipdrinks.com/uk/).

This is a stepped repo that illustrates the benefits and process of implementing an @ngrx store within an existing Angular application.  Each step is a separate branch that builds on the previous step. The instructions listed below outline the process taken in each step.

## Start
We have an awesome ecommerce app that allows users to view our wine listing and add bottles to their cart. To achieve this, we are storing our state across multiple services that expose methods for retriving and updating state.

This poses a couple of design concerns:
1. Our service is responsible for managing, updating, and selecting state.
2. The responsibility lies on our components to collect and compose the state from multiple services.

Lets say we would like to ensure that users cannot order more bottles than are in stock. We're now in a situation where the state of our cart impacts the state of our inventory.  As the user adds more to their cart, we'll need to decrement the inventory; when we decrement the inventory, we need to make sure the user can't add more than the number available.  With our state split across multiple services, the onus is now on our components to know what state modifications need to happen after any given action.

## Step 1: Install NgRx
1. `ng add @ngrx/store --module core/core.module.ts --statePath core/store`: this installs the `@ngrx/store` dependency, creates stubs out a few files for us, and provides the store in our `CoreModule`.
2. `ng add @ngrx/schematics`: this allows us to generate different NgRx files through the angular cli. Since these schematics extend the Angular ones, it's safe to set this as the default collection.
3. Lets put those schematics to work and generate a reducer for our products:
    ```
    cd core/store
    mkdir products
    cd products
    ng g r products
    ```
    This will generate a file for us that defines a piece of state and the reducer function that updates that state.
4. First, lets define our state and its initial values:
    ```
    // core/store/products/product.reducer.ts
    export interface State {
      allProducts: App.Product[] | undefined;
      currentProductId: number | undefined;
    }

    export const initialState: State = {
      allProducts: undefined,
      currentProductId: undefined
    };

    ```
5. Last but not least, we need to include our reducer functions inside our store:
    ```
    // core/store/index.ts

    import * as fromProducts from './products/products.reducer';

    export interface State {
      products: fromProducts.State;
    }

    export const reducers: ActionReducerMap<State> = {
      products: fromProducts.reducer
    };

    ```
## Step 2: Select our state
1. There aren't any schematics available for selectors so we'll need to manually create files like a bunch of chumps:
    ```
    cd core/store/products
    touch products.selectors.ts
    ```
2. Now we need to define a `FeatureSelector` that our other selectors will build upon. The `FeatureSelector` is responsible for selecting the overall piece of state:
    ```
    // core/store/products/products.selectors.ts

    const getProductsState = createFeatureSelector('products');
    ```
    Now we can use our `getProductsState` selector to select even smaller pieces of state:
    ```
    // core/store/products/products.selectors.ts

      export const getCurrentProductId = createSelector(
      getProductsState,
      (state: State): number => {
        return state.currentProductId;
      }
    );

    export const getCurrentProduct = createSelector(
      getAllProducts,
      getCurrentProductId,
      (allProducts, currentProductId): App.Product | undefined => {
        return allProducts.find((product) => product.id === currentProductId);
      }
    );
    ```
3. Let's put 'em to work. Inside our `ProductListingComponent` we will replace the call to our `ProductService` and instead select from our store:
    ```
    // product-listing/product-listing.component.ts

    import { Store } from '@ngrx/store';
    import { State } from '../core/store';

    ...

    constructor(
      private store: Store<State>
    ) { }

    ngOnInit() {
      this.products = this.store.select(getAllProducts);
    }

    ```
4. That was pretty easy. Lets take a look at our `CartComponent` and see what we can do there. This is a bit more complicated since the `CartComponent` depends on multiple pieces of state, but there are ways to offload this. First, we'll create a selector for our `CartComponent` itself:
    ```
    cd src/app/cart/
    touch cart.selectors.ts
    ```
    We can use this file to define and construct the state for our component itself:
    ```
    // src/cart/cart.selectors.ts
    import { getCartItems } from '../core/store/cart/cart.selectors';
    import { getAllProducts } from '../core/store/products/products.selectors';

    interface CartState {
      cart: App.Cart;
      products: App.Product[];
    }

    export const getCartState = createSelector(
      getCartItems,
      getAllProducts,
      (cart: App.Cart, products: App.Product[]): CartState => {
        return { cart, products };
      }
    );

    // src/cart/cart.component.ts
    import { Store } from '@ngrx/store';
    import { State } from '../core/store';
    import { getCartState } from './cart.selectors';

    ...

    constructor(
      private store: Store<State>
    ) { }

    ngOnInit() {
      this.store.select(getCartState)
    }
    ```
    And voila! Our `CartComponent` is no longer concerned about where its data is coming from or how it's being constructed. All it cares about is receiving and reacting to changes.

## Step 3: Define our Cart Actions and Reducers
1. Lets use schematics to create our first action:
    ```
    cd core/store/cart
    ng g a cart
    ```
    This will generate a file for us to keep all our cart actions in.
2. We'll construct a couple of actions; one for adding an item and another for removing in item:
    ```
    // core/store/cart/cart.actions.ts
    export const addItem = createAction(
      '[Cart] Add Item',
      props<{productId: number}>()
    );

    export const removeItem = createAction(
      '[Cart] Remove Item',
      props<{productId: number}>()
    );
    ```
2. Now we need to fill in our reducer functions, which define what happens to our cart state when these actions are dispatched. I'm using lodash's `clonedeep` function to ensure I don't mutate state, but you can use something more robust like [ImmutableJS](https://immutable-js.github.io/immutable-js/) as well.
    ```
    // core/store/cart/cart.reducer.ts

    const cartReducer = createReducer(
      initialState,
      on(addItem, (state, { productId }) => {
        const items = cloneDeep(state.items);
        const item = items.find((item) => item.productId === productId);

        if (!item) {
          items.push({ productId, quantity: 1 });
        } else {
          item.quantity++;
        }

        return { ...state, items };
      }),

      on(removeItem, (state, { productId }) => {
        const items = state.items.filter((item) => item.productId !== productId);

        return { ...state, items };
      })
    );
    ```
3. Lets hook up the store to our product and cart components 4. Now that our plumbing is in, lets re-evaluate the need for our services. Our `ProductService` is still being use to retrieve data, but our `CartService` is no longer being used :tada:.

## Step 4: Effects
The only piece of our code still using a service directly is the `AppComponent`, which uses `ProductsService` to fetch data. While we *could* leave this responsibility in our `AppComponent`, it kind of goes against what we're trying to achieve. We don't want our components be concerned about where that state comes from or what to do with it once it arrives, so lets go all in and find out how get this flow into our store.

Often, your app will want to perform a series of "Side-Effects" based on any given event. In our example, we want to fetch product data when the app initializes. Ideally, our `AppComponent` would just dispatch an event and forget about everything.  Unfortunately, regular ol' actions don't support asynchronous tasks, so we can use them entirely. What we really need to do is dispatch an action and then have the store handle getting the data and storing it. In this case, the action of fetching data is a "side effect" of the app being loaded. Luckily, @ngrx has us covered here and has a library for handling such "effects", so lets go ahead and install it.

1. `ng add @ngrx/effects --module core/core.module.ts --minimal`: this installs the `effects` library as a dependency without the additional boilerplate.
2. Now we'll use schematics to generate the effect for us and provide it to our `CoreModule`:
    ```
    cd core/store/products
    ng g ef products --module ../../core/module.ts
    ```
3. `@ngrx/effects` lets us listen to actions, perform side effects, and emit new actions as a result. First things first, we need to define a couple new actions and reducer methods:
    ```
    // core/store/products/products.actions.ts

    export const loadProductsSuccess = createAction(
      '[Products] Load Products Success',
      props<{ products: App.Product[]}>()
    );

    // core/store/products/products.reducer.ts

    const productsReducer = createReducer(
      initialState,
      on(loadProductsSuccess, (state, { products }) => {
        return { ...state, allProducts: products };
      })
    );

    ```
4. Now we can use the above to construct our `fetchProducts` effect:
    ```
    // core/store/products/products.effects.ts

    fetchProducts = createEffect(
      () => this.actions$.pipe(
        ofType(loadProducts),
        switchMap(() => this.productsService.fetchProducts()),
        map((products) => loadProductsSuccess({ products }))
      )
    );
    ```
    This listens for our `loadProducts` action, fetches the data by using our `ProductsService`, and then uses the response to populate the payload of `loadProductsSuccess`, which our updated reducer function will use to update the state.
5. And finally, lets kick the whole process off in our `AppComponent`:
    ```
    // app.component.ts

    ngOnInit() {
      this.state = this.store.select(getAppState);
      this.store.dispatch(loadProducts());
    }
    ```

## Step 5: Router Events
We're almost there! There's still one thing I don't like about our current setup: The `ProductComponent` needs to do determine what product to load based on the current route. Instead of our component being concerned about the route's state and using it to select state, wouldn't it be slick if there was just a selector for that? You may have wondered when we would finally use the `currentProductId` state, and now we'll finally be able to put it to use. @ngrx includes a handy-dandy library for integrating Angular's router into our store: `@ngrx/router-store`. This library stores the current state of the router inside the store and dispatches actions for all routing events. This means we will be able to easily compose selectors using the router's state!

1. `ng add @ngrx/router-store --module core/core.module.ts`: this installs the library and provides it to our `CoreModule`.
2. By default, this library will store something that looks like this:
    ```
    {
      routerState: {
        root:
        children: [{…}]
        component: undefined
        data: {}
        firstChild: {params: {…}, paramMap: ParamsAsMap, data: {…}, url: Array(1), outlet: "primary", …}
        fragment: null
        outlet: "primary"
        paramMap: ParamsAsMap {params: {…}}
        params: {}
        parent: undefined
        pathFromRoot: undefined
        queryParamMap: ParamsAsMap {params: {…}}
        queryParams: {}
        root: undefined
        routeConfig: null
        url: []
      }
      url: "/cart"
      type: "@ngrx/router-store/navigated"
    }
    ```
    ...which isn't super helpful. Luckily, we can specify how `@ngrx/router-store` stores the router's state in our store by using a `serializer`. Luckily * 2, `@ngrx/router-store` has already written a great serializer that stores the router's state like this: `{ url, params, queryparams }`. So we'll go ahead and copy/paste their code from [here](https://ngrx.io/guide/router-store/configuration#custom-router-state-serializer) to our own `core/store/custom-route-serializer.ts`.
3. Now we need to update our `CoreModule` to pass our custom serializer to `StoreRouterConnectingModule`:
    ```
    // core.module.ts
    StoreRouterConnectingModule.forRoot({
      serializer: CustomSerializer
    })
    ```
4. So the router's state exists nicely in our store, now we need to update our `products.productCurrentId` piece of state is updated on router navigation. Thinking back, this is a little familiar, right? We have a router action that we want to use to dispatch our `loadProductsSuccess` action; sounds like an effect, right? Lets get that set up:
    ```
    // core/store/products/products.actions.ts

    export const loadProduct = createAction(
      '[Products] Load Product',
      props<{ productId: number }>()
    );

    // core/store/products/products.reducewrs.ts

    on(loadProduct, (state, { productId }) => {
      return { ...state, currentProductId: productId };
    })

    // core/store/products/products.effects.ts

    loadProduct = createEffect(
      () => this.actions$.pipe(
        ofType(ROUTER_NAVIGATED),
        map((action: any) => action.payload.routerState.params && action.payload.routerState.params.productId),
        filter((productId) => !!productId),
        map((productId: string) => {
          return loadProduct({ productId: parseInt(productId, 10) });
        })
      )
    );
    ```
5. Now that everything's being set and stored correctly, we just need a selector to compose this data for our `ProductComponent`:
    ```
    // core/store/products/products.selectors.ts

    export const getCurrentProduct = createSelector(
      getAllProducts,
      getCurrentProductId,
      (allProducts, currentProductId): App.Product | undefined => {
        return allProducts.find((product) => product.id === currentProductId);
      }
    );
    ```
    This is a great demonstration of the "composability" of selectors: we're leveraging the `getAllProducts` and `getCurrentProductId` selectors we wrote previously to derive a new piece of state: the `currentProduct`.
6. And for the finishing touch, we just need to update our `ProductComponent` so that it uses our new selector:
    ```
    // src/app/product/product.component.ts

    this.product = this.store.select(getCurrentProduct);
    ```