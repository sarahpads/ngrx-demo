# NgRx Ecommerce

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.20.

We will go through the process of converting an existing angular application's state management system into an NgRx store.

## Start
We have an awesome ecommerce app that allows users to view our product listing and add items to their cart. To achieve this, we are storing our state across multiple services and exposing methods for retriving and updating state.

This poses a couple of design concerns:
1. Our service is responsible for managing state, updating state, selecting state, and managing any side effects.
2. The onus is on our components for selecting this state from multiple services and composing it.