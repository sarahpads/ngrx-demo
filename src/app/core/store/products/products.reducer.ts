import { Action, createReducer, on } from '@ngrx/store';


export const productsFeatureKey = 'products';

export interface State {
  allProducts: App.Product[] | undefined;
  currentProductId: number | undefined;
}

export const initialState: State = {
  allProducts: [
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
  ],
  currentProductId: undefined
};

const productsReducer = createReducer(
  initialState,

);

export function reducer(state: State | undefined, action: Action) {
  return productsReducer(state, action);
}
