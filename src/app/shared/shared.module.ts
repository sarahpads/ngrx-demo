import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ButtonComponent } from './button/button.component';
import { PriceComponent } from './price/price.component';
import { NumberInputComponent } from './number-input/number-input.component';
import { NumberDirective } from './number.directive';

@NgModule({
  declarations: [ButtonComponent, PriceComponent, NumberInputComponent, NumberDirective],
  imports: [
    CommonModule,
    FormsModule
  ],
  providers: [CurrencyPipe],
  exports: [ButtonComponent, PriceComponent, NumberInputComponent]
})
export class SharedModule { }
