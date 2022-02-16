/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit, ViewChild, Inject } from '@angular/core';
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

import { EmployeeService, Employee } from 'src/app/api';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-employee-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  dataSource: MatTableDataSource<Employee>;
  columns: string[] = ['id', 'name', 'job', 'cpf', 'edit'];
  lenght: number;
  employeeList: Employee[];

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private snackBar: MatSnackBar,
    private titleService: Title,
    private employeeService: EmployeeService,
    private dialog: MatDialog,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadAllEmployee();
    this.setTitle('Sistema de ponto - funcionário');
  }

  setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  loadAllEmployee() {
    this.employeeService.getAllEmployee().subscribe({
      next: (resp) => {
        this.employeeList = resp as Employee[];
        this.lenght = this.employeeList.length;
        this.dataSourceValue();
      },
      error: (err) => {
        const msg = err.error?.message ? err.error.message : 'Tente novamente em instantes.';
        this.snackBar.open(msg, 'Erro', { duration: 5000 });
      },
    });
  }

  dataSourceValue() {
    this.dataSource = new MatTableDataSource<Employee>(this.employeeList);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  routeUpdate(employee) {
    this.router.navigate(['/funcionario'], { state: { employee } });
  }

  removeDialog(employeeId) {
    const dialog = this.dialog.open(ConfirmDialog, { data: { employeeId } });
    dialog.afterClosed().subscribe((remove) => {
      if (remove) {
        this.remove(employeeId);
      }
    });
  }

  remove(employeeId) {
    this.employeeService.remove(employeeId).subscribe({
      next: () => {
        const msg = 'Removido com sucesso!';
        this.employeeList = this.employeeList.filter((item) => {
          return item.id != employeeId;
        });
        this.lenght = this.employeeList.length;
        this.dataSourceValue();
        this.snackBar.open(msg, 'Sucesso', { duration: 5000 });
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
    <h1 mat-dialog-title>Deseja realmente remover funcionário id: {{ data.employeeId }}?</h1>
    <div mat-dialog-actions>
      <button mat-button [mat-dialog-close]="false" tabindex="-1">Não</button>
      <button mat-button [mat-dialog-close]="true" tabindex="2">Sim</button>
    </div>
  `,
})
export class ConfirmDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
