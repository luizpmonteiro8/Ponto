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

import { PaymentService, Payment, Employee } from 'src/app/api';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-payment-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  dataSource: MatTableDataSource<Payment>;
  columns: string[] = ['id', 'name', 'dayOfPayment', 'totalSalary', 'edit'];
  lenght: number;
  paymentList: Payment[];
  employeeList: Employee[];

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private snackBar: MatSnackBar,
    private titleService: Title,
    private paymentService: PaymentService,
    private dialog: MatDialog,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadAllPayment();
    this.setTitle('Sistema de ponto - funcionário');
  }

  setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  loadAllPayment() {
    this.paymentService.getAllPayment().subscribe({
      next: (resp) => {
        this.paymentList = resp as Payment[];
        this.lenght = this.paymentList.length;
        this.dataSourceValue();
      },
      error: (err) => {
        const msg = err.error?.message ? err.error.message : 'Tente novamente em instantes.';
        this.snackBar.open(msg, 'Erro', { duration: 5000 });
      },
    });
  }

  dataSourceValue() {
    this.dataSource = new MatTableDataSource<Payment>(this.paymentList);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  routeUpdate(paymentList) {
    this.router.navigate(['/salario/listagem'], { state: { paymentList } });
  }

  removeDialog(paymentId) {
    const dialog = this.dialog.open(ConfirmDialog, { data: { paymentId } });
    dialog.afterClosed().subscribe((remove) => {
      if (remove) {
        this.remove(paymentId);
      }
    });
  }

  remove(paymentId) {
    this.paymentService.remove(paymentId).subscribe({
      next: () => {
        const msg = 'Removido com sucesso!';
        this.paymentList = this.paymentList.filter((item) => {
          return item.id != paymentId;
        });
        this.lenght = this.paymentList.length;
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
    <h1 mat-dialog-title>Deseja realmente remover funcionário id: {{ data.paymentId }}?</h1>
    <div mat-dialog-actions>
      <button mat-button [mat-dialog-close]="false" tabindex="-1">Não</button>
      <button mat-button [mat-dialog-close]="true" tabindex="2">Sim</button>
    </div>
  `,
})
export class ConfirmDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
