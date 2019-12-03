import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, FormArray } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { State } from '../core/store';
import { getCartState } from './cart.selectors';
import { removeItem } from '../core/store/cart/cart.actions';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public totalCost: number;

  private onDestroy: Subject<any> = new Subject();

  constructor(
    private store: Store<State>
  ) { }

  get items() {
    return this.form && this.form.get('items') as FormArray;
  }

  ngOnInit() {
    this.form = new FormGroup({ items: new FormArray([]) });
    this.items.valueChanges
      .pipe(takeUntil(this.onDestroy))
      .subscribe(this.calculateTotalCost.bind(this));

    this.store.select(getCartState)
      .pipe(takeUntil(this.onDestroy))
      .subscribe(({ cart, products }) => {
        for (const item of cart) {
          const product = products.find((product) => product.id === item.productId);

          if (!product) {
          debugger;
            return;
          }

          this.items.push(new FormGroup({
            name: new FormControl(product.title),
            quantity: new FormControl(item.quantity),
            price: new FormControl(product.price),
            id: new FormControl(product.id)
          }));
        }

        this.calculateTotalCost();
      });
  }

  ngOnDestroy() {
    this.onDestroy.next(null);
  }

  public removeItem(productId: number, index: number) {
    this.items.removeAt(index);
    this.store.dispatch(removeItem({ productId }));
  }

  private calculateTotalCost() {
    this.totalCost = this.items.controls.reduce((total, control) => {
      const price = parseInt(control.get('price').value, 10);
      const quantity = parseInt(control.get('quantity').value, 10);

      const itemCost = price * quantity;

      total += itemCost;

      return total;
    }, 0);
  }
}
