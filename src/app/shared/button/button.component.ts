import { Component, OnInit, Input, Renderer2, ElementRef } from '@angular/core';

@Component({
  selector: 'button[app-button], a[app-button]',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  @Input('app-button') public type: string = 'secondary';

  constructor(
    private element: ElementRef,
    private renderer: Renderer2
  ) { }

  ngOnInit() {
    if (!this.type) {
      this.type = 'secondary';
    }

    this.renderer.addClass(this.element.nativeElement, `-${this.type}`)
  }

}
