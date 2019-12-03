import { Component, OnInit, Optional, Self } from '@angular/core';
import { ControlValueAccessor, FormControlDirective } from '@angular/forms';

@Component({
  selector: 'app-number-input',
  templateUrl: './number-input.component.html',
  styleUrls: ['./number-input.component.scss']
})
export class NumberInputComponent implements ControlValueAccessor {
  public value = '0';
  public onChange(value: string) {}
  public onTouched() {}

  constructor(
    @Optional() @Self() public ngControl: FormControlDirective
  ) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }


  public writeValue(value) {
    this.value = value;
  }

  public registerOnChange(callback) {
    this.onChange = callback;
  }

  public registerOnTouched(callback) {
    this.onTouched = callback;
  }

  public decrement() {
    const value = parseInt(this.value, 10);
    this.updateValue(value - 1);
  }

  public increment() {
    const value = parseInt(this.value, 10);
    this.updateValue(value + 1);
  }

  public onInputChange(value) {
    this.updateValue(value);
  }

  private updateValue(value) {
    this.writeValue(value);
    this.onChange(this.value);
  }
}
