import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductListingComponent } from './product-listing.component';
import { ProductListingRoutingModule } from './product-listing-routing.module';
import { ProductTileComponent } from './product-tile/product-tile.component';

@NgModule({
  declarations: [ProductListingComponent, ProductTileComponent],
  imports: [
    CommonModule,
    ProductListingRoutingModule
  ]
})
export class ProductListingModule { }
