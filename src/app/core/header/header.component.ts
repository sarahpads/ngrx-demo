import { Component, OnInit } from '@angular/core';

import { CartService } from 'src/app/shared/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public cartSize: number;

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.cartService.getCart().subscribe((cart) => {
      this.cartSize = cart.length;
    });
  }

}
