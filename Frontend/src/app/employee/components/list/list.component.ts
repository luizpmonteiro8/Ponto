/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit, ViewChild } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import { MatPaginator } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { MatSort } from '@angular/material/sort';

import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { of } from 'rxjs';

import { EmployeeService, Employee } from 'src/app/api';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-employee-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  dataSource: MatTableDataSource<Employee>;
  columns: string[] = ['id', 'name'];
  lenght: number;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private snackBar: MatSnackBar, private titleService: Title, private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.loadAllJob();
    this.setTitle('Sistema de ponto - funcionário');
  }

  setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  loadAllJob() {
    this.employeeService.getAllEmployee().subscribe({
      next: (resp) => {
        const employeeList = resp as Employee[];
        this.dataSource = new MatTableDataSource<Employee>(employeeList);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.lenght = employeeList.length;
      },
      error: (err) => {
        const msg = err.error?.message ? err.error.message : 'Tente novamente em instantes.';
        this.snackBar.open(msg, 'Erro', { duration: 5000 });
      },
    });
  }
}
