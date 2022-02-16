import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cpf',
})
export class CpfPipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): unknown {
    value = value.replace(/\D/g, '');
    const mask = '999.999.999-99';
    const pad = mask.replace(/\D/g, '').replace(/9/g, '_');
    const valueMask = value + pad.substring(0, pad.length - value.length);
    let valueMaskPos = 0;

    value = '';
    for (let i = 0; i < mask.length; i++) {
      if (isNaN(parseInt(mask.charAt(i)))) {
        value += mask.charAt(i);
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
