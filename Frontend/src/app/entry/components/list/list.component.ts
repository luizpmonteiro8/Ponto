/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit, ViewChild, Inject, Input, Output, EventEmitter } from '@angular/core';
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

import { EntryService, Entry } from 'src/app/api';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-entry-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  dataSource: MatTableDataSource<Entry>;
  columns: string[] = ['id', 'type', 'dateTime', 'edit'];
  lenght: number;
  @Input() entryList: Entry[];
  @Output() entryId = new EventEmitter<string>();

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private snackBar: MatSnackBar,
    private titleService: Title,
    private service: EntryService,
    private dialog: MatDialog,
    private router: Router,
  ) {}

  ngOnInit(): void {}

  ngOnChanges(changes) {
    this.dataSourceValue();
  }

  setEntryId(id) {
    this.entryId.emit(id);
  }

  dataSourceValue() {
    this.dataSource = new MatTableDataSource<Entry>(this.entryList);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  removeDialog(employeeId) {
    const dialog = this.dialog.open(ConfirmDialog, { data: { employeeId } });
    dialog.afterClosed().subscribe((remove) => {
      if (remove) {
        this.remove(employeeId);
      }
    });
  }

  remove(id) {
    this.service.remove(id).subscribe({
      next: () => {
        const msg = 'Removido com sucesso!';
        this.entryList = this.entryList.filter((item) => {
          return item.id != id;
        });
        this.lenght = this.entryList.length;
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
    <h1 mat-dialog-title>Deseja realmente remover lançamento id: {{ data.employeeId }}?</h1>
    <div mat-dialog-actions>
      <button mat-button [mat-dialog-close]="false" tabindex="-1">Não</button>
      <button mat-button [mat-dialog-close]="true" tabindex="2">Sim</button>
    </div>
  `,
})
export class ConfirmDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
