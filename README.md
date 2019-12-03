# NgRx Ecommerce

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.20.

We will go through the process of converting an existing angular application's state management system into an NgRx store.

## Start
We have an awesome ecommerce app that allows users to view our product listing and add items to their cart. To achieve this, we are storing our state across multiple services and exposing methods for retriving and updating state.

This poses a couple of design concerns:
1. Our service is responsible for managing state, updating state, selecting state, and managing any side effects.
2. The onus is on our components for selecting this state from multiple services and composing it and making sure data changes are propogated correctly.

## Step 1: Install NgRx
1. `ng add @ngrx/store --path core/core.module.ts --statePath core/store`: this installs the `@ngrx/store` dependency and bootstraps an NgRx store for us in our `CoreModule`.
2. `ng add @ngrx/schematics`: this allows us to generate different NgRx pieces through the angular cli. Since these schematics extend the Angular ones, it's safe to set these as the default collection.
3. Lets put those schematics to work and generate a piece of state for our products. First, create a `products` directory in the newly generated `store` directory. From within the `products` directory, run `ng g r products`. For now, lets not create success/failure actions, and lets use the `create function`.
4. Define our state
5. Include our reducer functions inside our `store/index.ts` file.

## Step 2: Select our state
1. No schematics to help us here, we'll need to manually create files like a bunch of chumps! First, lets create selectors for both of our pieces of state:
- getAllProducts
- getCurrentProductId
- getCurrentProduct
- getProductById
- getCartItems
2. We'll need to update our smart components to retrieve these values from our store instead of services.
3. Our CartComponent is currently composing its internal state from a combination of selectors - we can offload this!

## Step 3: Define our Cart Actions and Reducers
1. From within our `core/store/cart` directory, run `ng g a cart`. To start, lets define actions for adding and removing items from the cart.
2. Run `npm install lodash.clonedeep` so that we can ensure we don't mutate state
3. Lets hook up the store to our product and cart components
4. Lets take a look at what's still using our services
- CartService isn't being used at all anymore, we can remove it!