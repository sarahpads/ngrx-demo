import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { CustomSerializer } from './store/custom-route-serializer';
import { EffectsModule } from '@ngrx/effects';

import { HeaderComponent } from './header/header.component';
import { reducers, metaReducers } from './store';
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
    EffectsModule.forFeature([ProductsEffects]),
    StoreRouterConnectingModule.forRoot({
      serializer: CustomSerializer
    })
  ],
  exports: [HeaderComponent]
})
export class CoreModule { }
