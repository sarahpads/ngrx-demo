import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';

import { ProductService } from '../shared/product.service';
import { CartService } from '../shared/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  public product: App.Product;

  constructor(
    private cartService: CartService,
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
    ) { }

  ngOnInit() {
    this.route.params.pipe(
      map((params: any) => {
        return this.productService.getProductById(parseInt(params.productId, 10));
      })
    ).subscribe((product) => {
      if (!product) {
        this.router.navigate(['/']);
      }

      this.product = product;
    });
  }

  public addToCart() {
    this.cartService.add(this.product.id);
  }
}
