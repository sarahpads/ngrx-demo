import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';

import * as fromCart from './cart/cart.reducer';
import * as fromProducts from './products/products.reducer';

export interface State {
  cart: fromCart.State;
  products: fromProducts.State;
}

export const reducers: ActionReducerMap<State> = {
  cart: fromCart.reducer,
  products: fromProducts.reducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
