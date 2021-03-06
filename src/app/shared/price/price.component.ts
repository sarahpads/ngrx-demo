import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.scss']
})
export class PriceComponent implements OnInit, OnChanges {
  @Input() public price: number;
  public dollars = '0';
  public cents = '00';

  constructor(
    private currencyPipe: CurrencyPipe
  ) { }

  ngOnInit() {
  }

  ngOnChanges(changes) {
    if (changes.price && typeof changes.price.currentValue !== 'undefined') {
      const [ dollars, cents ] = this.currencyPipe.transform(this.price, 'CAD', '').split('.');

      this.dollars = dollars;
      this.cents = cents;
    }
  }

}
