import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';

import { HeaderComponent } from './header/header.component';
import { reducers, metaReducers } from './store';
import { EffectsModule } from '@ngrx/effects';
import { ProductsEffects } from './store/products/products.effects';

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    RouterModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
    EffectsModule.forRoot([]),
    EffectsModule.forFeature([ProductsEffects])
  ],
  exports: [HeaderComponent]
})
export class CoreModule { }
