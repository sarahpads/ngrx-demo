import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly cart$: BehaviorSubject<App.Cart> = new BehaviorSubject([]);

  constructor() { }

  getCart(): Observable<App.Cart> {
    return this.cart$.asObservable();
  }

  private set cart(cart: App.Cart) {
    this.cart$.next(cart);
  }

  public add(productId: number): void {
    const cart = this.cart$.getValue();
    const item = cart.find((item: App.CartItem) => item.productId === productId);

    if (!!item) {
      item.quantity++;
      this.cart = cart;
    } else {
      this.cart = [
        ...cart,
        { productId, quantity: 1 }
      ];
    }
  }

  public remove(productId: number): void {
    this.cart = this.cart$.getValue().filter((item: App.CartItem) => item.productId !== productId);
  }
}
