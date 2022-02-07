import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatToolbarModule } from '@angular/material/toolbar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

import { MenuTPComponent, MenuComponent } from './components';

@NgModule({
  declarations: [MenuComponent, MenuTPComponent],
  imports: [CommonModule, FlexLayoutModule, MatToolbarModule, MatIconModule, MatMenuModule, MatButtonModule],
  exports: [MenuComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MenuModule {}
