import { createSelector, createFeatureSelector } from '@ngrx/store';
import { State } from './products.reducer';

const getProductsState = createFeatureSelector('products');

export const getAllProducts = createSelector(
  getProductsState,
  (state: State): App.Product[] => {
    return state.allProducts;
  }
);

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

export const getProductById = (productId) => createSelector(
  getAllProducts,
  (allProducts: App.Product[]): App.Product | undefined => {
    return allProducts.find((product) => product.id === productId);
  }
);
