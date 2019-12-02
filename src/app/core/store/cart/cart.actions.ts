import { createAction, props } from '@ngrx/store';

export const loadCart = createAction(
  '[Cart] Load Carts'
);

export const addItem = createAction(
  '[Cart] Add Item',
  props<{productId: number}>()
);

export const removeItem = createAction(
  '[Cart] Remove Item',
  props<{productId: number}>()
);


