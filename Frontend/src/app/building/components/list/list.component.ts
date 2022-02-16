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

import { BuildingService, Building } from 'src/app/api';
import { Title } from '@angular/platform-browser';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-building-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ListComponent implements OnInit {
  dataSource: MatTableDataSource<Building>;
  columns: string[] = ['id', 'name', 'edit'];
  lenght: number;
  buildingList: Building[];
  isTableExpanded = false;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private snackBar: MatSnackBar,
    private titleService: Title,
    private buildingService: BuildingService,
    private dialog: MatDialog,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadAllBuilding();
    this.setTitle('Sistema de ponto - funcionário');
  }

  setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  loadAllBuilding() {
    this.buildingService.getAllBuilding().subscribe({
      next: (resp) => {
        this.buildingList = resp as Building[];
        this.lenght = this.buildingList.length;
        this.dataSourceValue();
      },
      error: (err) => {
        const msg = err.error?.message ? err.error.message : 'Tente novamente em instantes.';
        this.snackBar.open(msg, 'Erro', { duration: 5000 });
      },
    });
  }

  toggleTableRows() {
    this.isTableExpanded = !this.isTableExpanded;

    this.buildingList.forEach((row: any) => {
      row.isExpanded = this.isTableExpanded;
    });
  }

  dataSourceValue() {
    this.dataSource = new MatTableDataSource<Building>(this.buildingList);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  routeUpdate(building) {
    this.router.navigate(['/construcao'], { state: { building } });
  }

  removeDialog(buildingId) {
    const dialog = this.dialog.open(ConfirmDialog, { data: { buildingId } });
    dialog.afterClosed().subscribe((remove) => {
      if (remove) {
        this.remove(buildingId);
      }
    });
  }

  remove(buildingId) {
    this.buildingService.remove(buildingId).subscribe({
      next: () => {
        this.buildingList = this.buildingList.filter((item) => {
          return item.id != buildingId;
        });
        this.lenght = this.buildingList.length;
        this.dataSourceValue();
        this.snackBar.open('Removido com sucesso!', 'Sucesso', { duration: 5000 });
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
    <h1 mat-dialog-title>Deseja realmente remover funcionário id: {{ data.buildingId }}?</h1>
    <div mat-dialog-actions>
      <button mat-button [mat-dialog-close]="false" tabindex="-1">Não</button>
      <button mat-button [mat-dialog-close]="true" tabindex="2">Sim</button>
    </div>
  `,
})
export class ConfirmDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
