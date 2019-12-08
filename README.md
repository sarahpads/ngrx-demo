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
3. Lets hook up the store to our product and cart components
4. Now that our plumbing is in, lets re-evaluate the need for our services. Our `ProductService` is still being use to retrieve data, but our `CartService` is no longer being used :tada:.