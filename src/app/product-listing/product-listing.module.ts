import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductListingComponent } from './product-listing.component';
import { ProductListingRoutingModule } from './product-listing-routing.module';
import { ProductTileComponent } from './product-tile/product-tile.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ProductListingComponent, ProductTileComponent],
  imports: [
    CommonModule,
    ProductListingRoutingModule,
    SharedModule
  ]
})
export class ProductListingModule { }
