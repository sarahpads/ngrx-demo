import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';

import { loadProducts, loadProductsSuccess } from './products.actions';
import { ProductService } from 'src/app/shared/product.service';

@Injectable()
export class ProductsEffects {

  constructor(
    private actions$: Actions,
    private productsService: ProductService
  ) {}

  fetchProducts = createEffect(
    () => this.actions$.pipe(
      ofType(loadProducts),
      switchMap(() => this.productsService.fetchProducts()),
      map((products) => loadProductsSuccess({ products }))
    )
  );
}
