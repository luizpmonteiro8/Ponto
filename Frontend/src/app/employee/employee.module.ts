import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';

import { ListComponent, FormComponent, EmployeeComponent } from './components';
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
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@NgModule({
  declarations: [FormComponent, ListComponent, EmployeeComponent],
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
    MatAutocompleteModule,
    SharedModule,
  ],
  providers: [
    EmployeeService,
    JobService,
    CepService,
    HttpUtilService,
    { provide: MatPaginatorIntl, useClass: PtBrMatPaginatorIntl },
  ],
})
export class EmployeeModule {}
