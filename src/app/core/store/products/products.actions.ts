import { createAction, props } from '@ngrx/store';

export const loadProducts = createAction(
  '[Products] Load Products'
);

export const loadProductsSuccess = createAction(
  '[Products] Load Products Success',
  props<{ products: App.Product[]}>()
);

export const loadProduct = createAction(
  '[Products] Load Product',
  props<{ productId: number }>()
);
