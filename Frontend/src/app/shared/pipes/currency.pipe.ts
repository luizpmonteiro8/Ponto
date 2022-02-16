import { Pipe, PipeTransform } from '@angular/core';
import { formatNumberOnWrite } from '../util/formatNumber';

@Pipe({
  name: 'currencyReal',
})
export class CurrencyRealPipe implements PipeTransform {
  transform(data: string, args?: any): string {
    return 'R$ ' + formatNumberOnWrite(data);
  }
}
