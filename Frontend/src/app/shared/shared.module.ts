import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaskDirective } from './directives/mask.directive';
import { PtBrMatPaginatorIntl } from './pt-br-mat-paginator-intl';

@NgModule({
  imports: [CommonModule],
  declarations: [MaskDirective],
  exports: [MaskDirective],
  providers: [PtBrMatPaginatorIntl],
})
export class SharedModule {}
