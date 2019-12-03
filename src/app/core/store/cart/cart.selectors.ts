import { createSelector, createFeatureSelector } from '@ngrx/store';
import { State } from './cart.reducer';

const getCartState = createFeatureSelector('cart');

export const getCartItems = createSelector(
  getCartState,
  (state: State): App.CartItem[] => {
    return state.items;
  }
);
