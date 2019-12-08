# @ngrx Demo

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.20.

I shamefully lifted the design concepts from [Seedlip Drink](https://seedlipdrinks.com/uk/).

This is a stepped repo that illustrates the benefits and process of implementing an @ngrx store within an existing Angular application. Each branch represents the finished state of that step. The instructions listed below outline the process taken in each step.

Cooresponding presentation slides are [here](https://github.com/sarahpads/ngrx-demo/blob/start/Intro%20to%20%40ngrx.pdf)

## Start
We have an awesome ecommerce app that allows users to view our wine listing and add bottles to their cart. To achieve this, we are storing our state across multiple services that expose methods for retriving and updating state.

This poses a couple of design concerns:
1. Our service is responsible for managing, updating, and selecting state.
2. The responsibility lies on our components to collect and compose the state from multiple services.

Lets say we would like to ensure that users cannot order more bottles than are in stock. We're now in a situation where the state of our cart impacts the state of our inventory.  As the user adds more to their cart, we'll need to decrement the inventory; when we decrement the inventory, we need to make sure the user can't add more than the number available.  With our state split across multiple services, the onus is now on our components to know what state modifications need to happen after any given action.