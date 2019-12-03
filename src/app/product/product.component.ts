import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { State } from '../core/store';
import { getCurrentProduct } from '../core/store/products/products.selectors';
import { addItem } from '../core/store/cart/cart.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  public product: Observable<App.Product>;

  constructor(
    private store: Store<State>
    ) { }

  ngOnInit() {
    this.product = this.store.select(getCurrentProduct);
  }

  public addToCart(productId) {
    this.store.dispatch(addItem({ productId }));
  }
}
