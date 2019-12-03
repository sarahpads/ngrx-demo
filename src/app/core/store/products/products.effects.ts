import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, filter, mapTo } from 'rxjs/operators';

import { loadProducts, loadProductsSuccess, loadProduct } from './products.actions';
import { ProductService } from 'src/app/shared/product.service';
import { ROUTER_NAVIGATED } from '@ngrx/router-store';

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

  loadProduct = createEffect(
    () => this.actions$.pipe(
      ofType(ROUTER_NAVIGATED),
      map((action: any) => action.payload.routerState.params.productId),
      filter((productId) => !!productId),
      map((productId: string) => {
        return loadProduct({ productId: parseInt(productId, 10) });
      })
    )
  );
}
