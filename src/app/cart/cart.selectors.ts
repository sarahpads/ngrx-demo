import { createSelector } from '@ngrx/store';
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
