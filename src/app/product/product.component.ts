import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

import { ProductService } from '../shared/product.service';
import { CartService } from '../shared/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {
  public product: App.Product;

  private onDestroy: Subject<any> = new Subject();

  constructor(
    private cartService: CartService,
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.route.params
      .pipe(
        takeUntil(this.onDestroy),
        map((params: any) => {
          return this.productService.getProductById(parseInt(params.productId, 10));
        })
      )
      .subscribe((product) => {
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
    this.cartService.add(this.product.id);
  }
}
