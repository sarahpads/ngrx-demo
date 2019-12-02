import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-cart-tile',
  templateUrl: './cart-tile.component.html',
  styleUrls: ['./cart-tile.component.scss']
})
export class CartTileComponent implements OnInit {
  @Input() form: FormGroup;
  @Output() public onRemove: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {}

  remove() {
    this.onRemove.emit();
  }
}
