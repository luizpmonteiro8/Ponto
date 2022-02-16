import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaskDirective } from './directives/mask.directive';
import { PtBrMatPaginatorIntl } from './pt-br-mat-paginator-intl';
import { CpfPipe, DatePipe, DateTimePipe, CurrencyRealPipe } from './pipes';

@NgModule({
  imports: [CommonModule],
  declarations: [MaskDirective, CpfPipe, DatePipe, DateTimePipe, CurrencyRealPipe],
  exports: [MaskDirective, CpfPipe, DatePipe, DateTimePipe, CurrencyRealPipe],
  providers: [PtBrMatPaginatorIntl],
})
export class SharedModule {}
