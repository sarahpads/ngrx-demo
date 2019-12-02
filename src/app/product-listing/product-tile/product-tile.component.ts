import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-product-tile',
  templateUrl: './product-tile.component.html',
  styleUrls: ['./product-tile.component.scss']
})
export class ProductTileComponent implements OnInit {
  @Input() public product: App.Product;

  constructor() { }

  ngOnInit() {
  }

}
