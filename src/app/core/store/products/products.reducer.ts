import { Action, createReducer, on } from '@ngrx/store';
import { loadProductsSuccess, loadProduct } from './products.actions';


export const productsFeatureKey = 'products';

export interface State {
  allProducts: App.Product[] | undefined;
  currentProductId: number | undefined;
}

export const initialState: State = {
  allProducts: undefined,
  currentProductId: undefined
};

const productsReducer = createReducer(
  initialState,
  on(loadProductsSuccess, (state, { products }) => {
    return { ...state, allProducts: products };
  }),

  on(loadProduct, (state, { productId }) => {
    console.log('here')
    return { ...state, currentProductId: productId };
  })
);

export function reducer(state: State | undefined, action: Action) {
  return productsReducer(state, action);
}
