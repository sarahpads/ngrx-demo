declare namespace App {
  type Cart = CartItem[];

  interface CartItem {
    productId: number;
    quantity: number;
  }
}