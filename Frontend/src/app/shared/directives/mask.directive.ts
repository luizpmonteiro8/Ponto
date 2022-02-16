import { Directive, HostListener, Input, ElementRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Directive({
  selector: '[mask]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: MaskDirective,
      multi: true,
    },
  ],
})
export class MaskDirective implements ControlValueAccessor {
  onTouched: any;
  onChange: any;

  @Input('mask') mask: string;

  constructor(private el: ElementRef) {}

  writeValue(value: any) {
    if (value) {
      this.el.nativeElement.value = this.applyMask(value);
    }
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  @HostListener('keyup', ['$event'])
  onKeyup($event: any) {
    const value: string = $event.target.value.replace(/\D/g, '');

    // onpress backspace
    if ($event.keyCode === 8) {
      this.onChange(value);
      return;
    }

    const pad = this.mask.replace(/\D/g, '').replace(/9/g, '_');
    if (value.length <= pad.length) {
      this.onChange(value);
    }

    $event.target.value = this.applyMask(value);
  }

  @HostListener('blur', ['$event'])
  onBlur($event: any) {
    //  if ($event.target.value.length === this.mask.length) {
    //   return;
    // }
    // this.onChange('');
    // $event.target.value = '';
  }

  applyMask(value: string): string {
    value = value.replace(/\D/g, '');
    const pad = this.mask.replace(/\D/g, '').replace(/9/g, '_');
    const valueMask = value + pad.substring(0, pad.length - value.length);
    let valueMaskPos = 0;

    value = '';
    for (let i = 0; i < this.mask.length; i++) {
      if (isNaN(parseInt(this.mask.charAt(i)))) {
        value += this.mask.charAt(i);
      } else {
        value += valueMask[valueMaskPos++];
      }
    }

    if (value.indexOf('_') > -1) {
      value = value.substr(0, value.indexOf('_'));
    }

    return value;
  }
}
