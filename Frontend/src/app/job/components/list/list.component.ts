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

import { JobService, Job } from 'src/app/api';

@Component({
  selector: 'app-job-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  dataSource: MatTableDataSource<Job>;
  columns: string[] = ['id', 'name'];

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private snackBar: MatSnackBar, private jobService: JobService) {}

  ngOnInit(): void {
    this.loadAllJob();
  }

  loadAllJob() {
    this.jobService.getAllJob().subscribe({
      next: (resp) => {
        const jobList = resp as Job[];
        this.dataSource = new MatTableDataSource<Job>(jobList);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        const msg = err.error?.message ? err.error.message : 'Tente novamente em instantes.';
        this.snackBar.open(msg, 'Erro', { duration: 5000 });
      },
    });
  }
}
