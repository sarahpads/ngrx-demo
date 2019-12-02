import { Component, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';

import { CartService } from '../shared/cart.service';
import { ProductService } from '../shared/product.service';
import { FormControl, FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  public form: FormGroup;
  public totalCost: number;

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
    ).subscribe(([cart, products]) => {
      for (const item of cart) {
        const product = products.find((product) => product.id === item.productId);

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

  public removeItem(index) {
    this.items.removeAt(index);
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
