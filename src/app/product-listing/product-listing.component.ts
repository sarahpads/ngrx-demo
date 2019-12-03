import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ProductService } from '../shared/product.service';

@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.scss']
})
export class ProductListingComponent implements OnInit, OnDestroy {
  public products: App.Product[];

  private onDestroy: Subject<any> = new Subject<any>;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.getProducts()
      .pipe(takeUntil(this.onDestroy))
      .subscribe((products) => {
        this.products = products;
      });
  }

  ngOnDestroy() {
    this.onDestroy.next(null);
  }

}
