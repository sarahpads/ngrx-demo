import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor() { }

  public fetchProducts() {
    return of([
      {
        id: 1,
        description: 'A bottle of Cabernet Sauvignon capsule with corkscrews and characteristics. Glass of Chardonnay stem on vineyards from the valley quality. Sip quality estate fruit made with grapes grown unique vine. Farmed locations planted sustainabilty winemakers grow harvest before aged to ensure each varietal.',
        inventory: 10,
        price: 10,
        tags: ['wine'],
        title: 'Product 1'
      },
      {
        id: 2,
        description: 'A bottle of Cabernet Sauvignon capsule with corkscrews and characteristics. Glass of Chardonnay stem on vineyards from the valley quality. Sip quality estate fruit made with grapes grown unique vine. Farmed locations planted sustainabilty winemakers grow harvest before aged to ensure each varietal.',
        inventory: 10,
        price: 20,
        tags: ['wine'],
        title: 'Product 2'
      },
      {
        id: 3,
        description: 'A bottle of Cabernet Sauvignon capsule with corkscrews and characteristics. Glass of Chardonnay stem on vineyards from the valley quality. Sip quality estate fruit made with grapes grown unique vine. Farmed locations planted sustainabilty winemakers grow harvest before aged to ensure each varietal.',
        inventory: 10,
        price: 30,
        tags: ['wine'],
        title: 'Product 3'
      },
      {
        id: 4,
        description: 'A bottle of Cabernet Sauvignon capsule with corkscrews and characteristics. Glass of Chardonnay stem on vineyards from the valley quality. Sip quality estate fruit made with grapes grown unique vine. Farmed locations planted sustainabilty winemakers grow harvest before aged to ensure each varietal.',
        inventory: 10,
        price: 40,
        tags: ['wine'],
        title: 'Product 4'
      },
      {
        id: 5,
        description: 'A bottle of Cabernet Sauvignon capsule with corkscrews and characteristics. Glass of Chardonnay stem on vineyards from the valley quality. Sip quality estate fruit made with grapes grown unique vine. Farmed locations planted sustainabilty winemakers grow harvest before aged to ensure each varietal.',
        inventory: 10,
        price: 50,
        tags: ['wine'],
        title: 'Product 5'
      }
    ]);
  }
}
