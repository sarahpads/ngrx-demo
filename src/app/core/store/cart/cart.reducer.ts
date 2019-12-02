import { Action, createReducer, on } from '@ngrx/store';


export const cartFeatureKey = 'cart';

export interface State {
  items: App.CartItem[];
}

export const initialState: State = {
  items: []
};

const cartReducer = createReducer(
  initialState,

);

export function reducer(state: State | undefined, action: Action) {
  return cartReducer(state, action);
}
