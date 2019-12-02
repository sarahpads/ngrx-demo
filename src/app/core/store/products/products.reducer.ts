import { Action, createReducer, on } from '@ngrx/store';


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

);

export function reducer(state: State | undefined, action: Action) {
  return productsReducer(state, action);
}
