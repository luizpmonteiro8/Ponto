import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Building, Employee, Entry, EntryDTO, entryType } from 'src/app/api';
import { BuildingService, EntryService } from 'src/app/api';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-employee-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  form: FormGroup;
  buildingList: Building[];
  employeeList: Employee[];
  entryTypeList: string[];
  hours: string[];
  minutes: string[];
  entryList: Entry[];

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private titleService: Title,
    private buildingService: BuildingService,
    private entryService: EntryService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.createForm();
    this.loadAllBuilding();
    this.entryTypeList = [
      entryType.ENTRADA,
      entryType.ALMOÇO,
      entryType.RETORNO_DO_ALMOÇO,
      entryType.SAIDA,
      entryType.FALTOU,
    ];
    this.hours = this.generateNumberList(0, 23);
    this.minutes = this.generateNumberList(0, 59);

    this.setDateOnInit();
  }

  createForm() {
    (this.form = this.fb.group({
      id: [''],
      type: ['', [Validators.required]],
      dateTime: ['', [Validators.required]],
      hours: ['', [Validators.required]],
      minutes: ['', [Validators.required]],
      obs: ['', []],
      employeeId: ['', [Validators.required]],
      buildingId: ['', [Validators.required]],
    })),
      this.setTitle('Sistema de ponto - lançamentos');
  }

  loadAllBuilding() {
    this.buildingService.getAllBuilding().subscribe({
      next: (resp) => {
        this.buildingList = resp as Building[];
      },
      error: (err) => {
        const msg = err.error?.message ? err.error.message : 'Tente novamente em instantes.';
        this.snackBar.open(msg, 'Erro', { duration: 5000 });
      },
    });
  }

  loadEmployeeByBuildingId($event) {
    const buildingId = $event.value;
    this.buildingList.forEach((item) => {
      if (item.id == buildingId) {
        this.employeeList = item.employeeList;
      }
    });
  }

  loadEntryByEmployeeId($event) {
    const employeeId = $event.value;
    this.entryService.getEntryByEmployeeId(employeeId).subscribe({
      next: (resp) => {
        this.entryList = resp as Entry[];
      },
      error: (err) => {
        const msg = err.error?.message ? err.error.message : 'Tente novamente em instantes.';
        this.snackBar.open(msg, 'Erro', { duration: 5000 });
      },
    });
  }

  generateNumberList(start: number, end: number): string[] {
    const numbers: string[] = [];
    for (let i = start; i <= end; i++) {
      let number: string = i.toString();
      if (i < 10) {
        number = '0' + number;
      }
      numbers.push(number);
    }
    return numbers;
  }

  setDateOnInit() {
    let zeroHours = '';
    let zeroMinutes = '';

    const date = new Date();
    this.form.get('dateTime').setValue(date);

    if (date.getHours() < 10) {
      zeroHours = '0';
    }
    if (date.getMinutes() < 10) {
      zeroMinutes = '0';
    }
    this.form.get('hours').setValue(zeroHours + date.getHours());
    this.form.get('minutes').setValue(zeroMinutes + date.getMinutes());
  }

  setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  updateEntry(id) {
    const entry = this.entryList.filter((item) => {
      return item.id == id;
    })[0];

    const date = new Date(entry.dateTime);
    date.setHours(date.getHours() + 3);

    this.form.setValue({
      id: entry.id,
      type: entry.type,
      dateTime: entry.dateTime,
      hours: this.convertHoursMinute(date.getHours()),
      minutes: this.convertHoursMinute(date.getMinutes()),
      obs: entry.obs,
      employeeId: entry.employee.id,
      buildingId: entry.buildingId,
    });
  }

  convertHoursMinute(value: number) {
    if (value < 10) return '0' + value;
    else return String(value);
  }

  setDateTimeOnsubmit() {
    const dateTime: Date = new Date(this.form.get('dateTime').value);
    dateTime.setHours(this.form.get('hours').value);
    dateTime.setMinutes(this.form.get('minutes').value);
    dateTime.setSeconds(0);

    return dateTime;
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    const dateTime = this.setDateTimeOnsubmit();

    const entry: EntryDTO = this.form.value;

    entry.dateTime = dateTime;

    if (entry.id > 0) {
      this.entryService.update(entry).subscribe({
        complete: () => {
          this.loadEntryByEmployeeId({ value: entry.employeeId });
          this.snackBar.open('Atualizado', 'Sucesso', { duration: 5000 });
        },
        error: (err) => {
          const msg = err.error?.message ? err.error.message : 'Tente novamente em instantes.';
          this.snackBar.open(msg, 'Erro', { duration: 5000 });
        },
      });
    } else {
      this.entryService.insert(entry).subscribe({
        next: (resp) => {
          this.loadEntryByEmployeeId({ value: entry.employeeId });
          this.snackBar.open('Salvo id ' + resp.id, 'Sucesso', { duration: 5000 });
        },
        error: (err) => {
          const msg = err.error?.message ? err.error.message : 'Tente novamente em instantes.';
          this.snackBar.open(msg, 'Erro', { duration: 5000 });
        },
      });
    }
  }
}
