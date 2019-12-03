import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { CartService } from 'src/app/shared/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  public cartSize: number;

  private onDestroy: Subject<any> = new Subject();

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.cartService.getCart()
      .pipe(takeUntil(this.onDestroy))
      .subscribe((cart) => {
        this.cartSize = cart.length;
      });
  }

  ngOnDestroy() {
    this.onDestroy.next(null);
  }

}
