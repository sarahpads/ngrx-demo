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
        description: 'Non-alcoholic, zero calories, sugar &amp; sweetener free with no artificial flavours. Water, Natural Botanical Distillates &amp; Extracts (Allspice berries, Cardamom, Grapefruit peel, Lemon peel, Oak bark, Cascarilla bark). Preservative: Potassium sorbate. Acid: Citric acid.',
        inventory: 10,
        price: 10,
        tags: ['wine'],
        title: 'Product 1'
      },
      {
        id: 2,
        description: 'Non-alcoholic, zero calories, sugar &amp; sweetener free with no artificial flavours. Water, Natural Botanical Distillates &amp; Extracts (Allspice berries, Cardamom, Grapefruit peel, Lemon peel, Oak bark, Cascarilla bark). Preservative: Potassium sorbate. Acid: Citric acid.',
        inventory: 10,
        price: 20,
        tags: ['wine'],
        title: 'Product 2'
      },
      {
        id: 3,
        description: 'Non-alcoholic, zero calories, sugar &amp; sweetener free with no artificial flavours. Water, Natural Botanical Distillates &amp; Extracts (Allspice berries, Cardamom, Grapefruit peel, Lemon peel, Oak bark, Cascarilla bark). Preservative: Potassium sorbate. Acid: Citric acid.',
        inventory: 10,
        price: 30,
        tags: ['wine'],
        title: 'Product 3'
      },
      {
        id: 4,
        description: 'Non-alcoholic, zero calories, sugar &amp; sweetener free with no artificial flavours. Water, Natural Botanical Distillates &amp; Extracts (Allspice berries, Cardamom, Grapefruit peel, Lemon peel, Oak bark, Cascarilla bark). Preservative: Potassium sorbate. Acid: Citric acid.',
        inventory: 10,
        price: 40,
        tags: ['wine'],
        title: 'Product 4'
      },
      {
        id: 5,
        description: 'Non-alcoholic, zero calories, sugar &amp; sweetener free with no artificial flavours. Water, Natural Botanical Distillates &amp; Extracts (Allspice berries, Cardamom, Grapefruit peel, Lemon peel, Oak bark, Cascarilla bark). Preservative: Potassium sorbate. Acid: Citric acid.',
        inventory: 10,
        price: 50,
        tags: ['wine'],
        title: 'Product 5'
      }
    ]);
  }

  public getProductById(productId: number): App.Product | undefined {
    return this.products$.getValue().find((product) => product.id === productId);
  }
}
