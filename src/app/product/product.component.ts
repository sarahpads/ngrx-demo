import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { map, switchMap, takeUntil } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import { State } from '../core/store';
import { getProductById } from '../core/store/products/products.selectors';
import { addItem } from '../core/store/cart/cart.actions';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {
  public product: App.Product;

  private onDestroy: Subject<any> = new Subject();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<State>
    ) { }

  ngOnInit() {
    this.route.params.pipe(
      takeUntil(this.onDestroy),
      switchMap((params: any) => {
        const productId = parseInt(params.productId, 10);
        return this.store.select(getProductById(productId));
      })
    ).subscribe((product) => {
      if (!product) {
        this.router.navigate(['/']);
      }

      this.product = product;
    });
  }

  ngOnDestroy() {
    this.onDestroy.next(null);
  }

  public addToCart() {
    this.store.dispatch(addItem({ productId: this.product.id }));
  }
}
