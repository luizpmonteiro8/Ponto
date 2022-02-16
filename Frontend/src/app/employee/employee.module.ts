import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';

import { ListComponent, FormComponent, EmployeeComponent, ConfirmDialog } from './components';
import { EmployeeService, JobService, CepService, HttpUtilService } from '../api';
import { SharedModule } from 'src/app/shared';

import { PtBrMatPaginatorIntl } from '../shared';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [FormComponent, ListComponent, EmployeeComponent, ConfirmDialog],
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatTooltipModule,
    MatIconModule,
    MatSnackBarModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatSelectModule,
    MatDialogModule,
    SharedModule,
  ],
  providers: [
    EmployeeService,
    JobService,
    CepService,
    HttpUtilService,
    { provide: MatPaginatorIntl, useClass: PtBrMatPaginatorIntl },
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
  ],
})
export class EmployeeModule {}
