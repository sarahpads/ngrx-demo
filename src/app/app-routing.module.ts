import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./product-listing/product-listing.module').then(mod => mod.ProductListingModule)
  },

  {
    path: 'cart',
    loadChildren: () => import('./cart/cart.module').then(mod => mod.CartModule)
  },

  {
    path: ':productId',
    loadChildren: () => import('./product/product.module').then(mod => mod.ProductModule)
  },

  {
    path: '**',
    redirectTo: '/'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
