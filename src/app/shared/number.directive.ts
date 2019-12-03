import { Directive, HostListener, Input } from '@angular/core';
import { FUNCTIONAL, NUMERIC } from './keycodes';


@Directive({
  selector: '[appNumber]'
})
export class NumberDirective {
  @Input() gtsNumber: any;

  public allowed = [
    ...FUNCTIONAL,
    ...NUMERIC
  ];

  @HostListener('keydown', ['$event']) onKeyDown(event) {
    if (!this.allowed.includes(event.keyCode)) {
      event.preventDefault();
    }
  }

  constructor() { }
}