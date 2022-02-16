import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'date',
})
export class DatePipe implements PipeTransform {
  transform(data: string, args?: any): string {
    const date = new Date(data);
    date.setHours(date.getHours() + 3);
    return date.toLocaleDateString();
  }
}
