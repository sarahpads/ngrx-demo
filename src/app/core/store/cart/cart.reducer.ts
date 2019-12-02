import { Action, createReducer, on } from '@ngrx/store';
import { addItem, removeItem } from './cart.actions';
import * as cloneDeep from 'lodash.clonedeep';


export const cartFeatureKey = 'cart';

export interface State {
  items: App.CartItem[];
}

export const initialState: State = {
  items: []
};

const cartReducer = createReducer(
  initialState,
  on(addItem, (state, { productId }) => {
    const items = cloneDeep(state.items);
    const item = items.find((item) => item.productId === productId);

    if (!item) {
      return state;
    }

    item.quantity++;

    return { ...state, items };
  }),

  on(removeItem, (state, { productId }) => {
    const items = state.items.filter((item) => item.productId !== productId);

    return { ...state, items };
  })
);

export function reducer(state: State | undefined, action: Action) {
  return cartReducer(state, action);
}
