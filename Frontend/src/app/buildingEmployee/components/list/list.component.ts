/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit, ViewChild, Inject, Input } from '@angular/core';
import { Router } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import { MatPaginator } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';

import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { BuildingEmployeeService, EmployeeStatus } from 'src/app/api';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-buildingemployee-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  dataSource: MatTableDataSource<EmployeeStatus>;
  columns: string[] = ['id', 'name', 'job', 'cpf', 'status', 'remove'];
  @Input() employeeList: EmployeeStatus[];
  lenght: number;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private snackBar: MatSnackBar,
    private titleService: Title,
    private dialog: MatDialog,
    private service: BuildingEmployeeService,
    private router: Router,
  ) {}

  ngOnInit(): void {}

  ngOnChanges(changes) {
    this.dataSourceValue();
  }

  dataSourceValue() {
    this.dataSource = new MatTableDataSource<EmployeeStatus>(this.employeeList);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  removeDialog(buildingEmployeeId) {
    const dialog = this.dialog.open(ConfirmDialog);
    dialog.afterClosed().subscribe((remove) => {
      if (remove) {
        this.remove(buildingEmployeeId);
      }
    });
  }

  remove(buildingEmployeeId) {
    this.service.remove(buildingEmployeeId).subscribe({
      next: () => {
        this.employeeList = this.employeeList.filter((item) => {
          return item.id != buildingEmployeeId;
        });
        this.dataSourceValue();
      },

      error: (err) => {
        const msg = err.error?.message ? err.error.message : 'Tente novamente em instantes.';
        this.snackBar.open(msg, 'Erro', { duration: 5000 });
      },
    });
  }
}

@Component({
  selector: 'confirm-dialog',
  template: `
    <h1 mat-dialog-title>Deseja realmente remover funcionário?</h1>
    <div mat-dialog-actions>
      <button mat-button [mat-dialog-close]="false" tabindex="-1">Não</button>
      <button mat-button [mat-dialog-close]="true" tabindex="2">Sim</button>
    </div>
  `,
})
export class ConfirmDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
