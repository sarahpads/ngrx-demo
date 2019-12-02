import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartComponent } from './cart.component';
import { CartRoutingModule } from './cart-routing.module';
import { CartTileComponent } from './cart-tile/cart-tile.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [CartComponent, CartTileComponent],
  imports: [
    CartRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CartModule { }
