import { createSelector } from '@ngrx/store';
import { getCartItems } from './core/store/cart/cart.selectors';

export interface AppState {
  cartSize: number;
}

export const getAppState = createSelector(
  getCartItems,
  (items: App.Cart): AppState => {
    const cartSize = items ? items.length : 0;

    return { cartSize };
  }
);
