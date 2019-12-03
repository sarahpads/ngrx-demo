import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, FormArray } from '@angular/forms';
import { combineLatest, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { CartService } from '../shared/cart.service';
import { ProductService } from '../shared/product.service';

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
    private cartService: CartService,
    private productService: ProductService
  ) { }

  get items() {
    return this.form.get('items') as FormArray;
  }

  ngOnInit() {
    this.form = new FormGroup({ items: new FormArray([]) });
    this.items.valueChanges.subscribe(this.calculateTotalCost.bind(this));

    combineLatest(
      this.cartService.getCart(),
      this.productService.getProducts()
    )
    .pipe(takeUntil(this.onDestroy))
    .subscribe(([cart, products]) => {
      // make sure new items are added
      for (const item of cart) {
        const isInForm = this.items.controls.some((control) => control.get('id').value === item.productId);

        if (isInForm) {
          continue;
        }

        const product = products.find((product) => product.id === item.productId);

        this.items.push(new FormGroup({
          name: new FormControl(product.title),
          quantity: new FormControl(item.quantity),
          price: new FormControl(product.price),
          id: new FormControl(product.id)
        }));
      }

      // make sure old items are removed
      for (let i = 0, len = this.items.controls.length; i < len; i++) {
        const productId = this.items.controls[i].get('id').value;
        const isInCart = cart.some((item) => item.productId === productId);

        if (!isInCart) {
          this.items.removeAt(i);
        }
      }

      this.calculateTotalCost();
    });
  }

  ngOnDestroy() {
    this.onDestroy.next(null);
  }

  public removeItem(productId: number, index: number) {
    this.items.removeAt(index);
    this.cartService.remove(productId);
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
