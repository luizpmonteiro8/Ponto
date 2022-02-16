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

import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { of } from 'rxjs';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { JobService, Job } from 'src/app/api';

@Component({
  selector: 'app-job-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  dataSource: MatTableDataSource<Job>;
  columns: string[] = ['id', 'name', 'edit'];
  lenght: number;
  jobList: Job[];

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private snackBar: MatSnackBar,
    private jobService: JobService,
    private dialog: MatDialog,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadAllJob();
  }

  loadAllJob() {
    this.jobService.getAllJob().subscribe({
      next: (resp) => {
        this.jobList = resp as Job[];
        this.dataSourceValue();
      },
      error: (err) => {
        const msg = err.error?.message ? err.error.message : 'Tente novamente em instantes.';
        this.snackBar.open(msg, 'Erro', { duration: 5000 });
      },
    });
  }

  dataSourceValue() {
    this.dataSource = new MatTableDataSource<Job>(this.jobList);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  routeUpdate(job) {
    this.router.navigate(['/cargo'], { state: { job } });
  }

  removeDialog(jobId) {
    const dialog = this.dialog.open(ConfirmDialog, { data: { jobId } });
    dialog.afterClosed().subscribe((remove) => {
      if (remove) {
        this.remove(jobId);
      }
    });
  }

  remove(jobId) {
    this.jobService.remove(jobId).subscribe({
      next: () => {
        const msg = 'Removido com sucesso!';
        this.jobList = this.jobList.filter((item) => {
          return item.id != jobId;
        });
        this.lenght = this.jobList.length;
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
    <h1 mat-dialog-title>Deseja realmente remover funcionário id: {{ data.jobId }}?</h1>
    <div mat-dialog-actions>
      <button mat-button [mat-dialog-close]="false" tabindex="-1">Não</button>
      <button mat-button [mat-dialog-close]="true" tabindex="2">Sim</button>
    </div>
  `,
})
export class ConfirmDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
