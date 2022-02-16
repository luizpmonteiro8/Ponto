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

import { Payment, PaymentItem } from 'src/app/api';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-payment-employeelist',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class EmployeeListComponent implements OnInit {
  dataSource: MatTableDataSource<PaymentItem>;
  columns: string[] = ['id', 'name', 'salary', 'dayOfAbsent', 'discont', 'totalSalary'];
  lenght: number;
  paymentList: Payment[] = [];
  paymentItem: PaymentItem[];

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private snackBar: MatSnackBar,
    private titleService: Title,
    private dialog: MatDialog,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadPaymentByState();
    this.setTitle('Sistema de ponto - funcionários da obra');
  }

  loadPaymentByState() {
    if (history.state.paymentList) {
      this.paymentList.push(history.state.paymentList);
      this.paymentItem = this.paymentList[0].paymentItem;
      this.dataSourceValue();
    }
  }

  setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  dataSourceValue() {
    this.dataSource = new MatTableDataSource<PaymentItem>(this.paymentItem);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
}
