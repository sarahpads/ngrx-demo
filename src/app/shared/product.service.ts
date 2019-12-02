import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly products$: BehaviorSubject<App.Product[]> = new BehaviorSubject([]);

  constructor() { }

  getProducts(): Observable<App.Product[]> {
    return this.products$.asObservable();
  }

  private set products(products) {
    this.products$.next(products);
  }

  public fetchProducts() {
    this.products$.next([
      {
        id: 1,
        inventory: 10,
        price: 10,
        title: 'Product 1'
      },
      {
        id: 2,
        inventory: 10,
        price: 20,
        title: 'Product 2'
      },
      {
        id: 3,
        inventory: 10,
        price: 30,
        title: 'Product 3'
      },
      {
        id: 4,
        inventory: 10,
        price: 40,
        title: 'Product 4'
      },
      {
        id: 5,
        inventory: 10,
        price: 50,
        title: 'Product 5'
      }
    ]);
  }

  public getProductById(productId: number): App.Product | undefined {
    return this.products$.getValue().find((product) => product.id === productId);
  }
}
