import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';
import { State } from '../core/store';
import { getAllProducts } from '../core/store/products/products.selectors';

@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.scss']
})
export class ProductListingComponent implements OnInit {
  public products: Observable<App.Product[]>;

  constructor(
    private store: Store<State>
  ) { }

  ngOnInit() {
   this.products = this.store.select(getAllProducts);
  }

}
