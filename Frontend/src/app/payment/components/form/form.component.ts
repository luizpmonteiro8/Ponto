import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Payment, PaymentDTO, Building } from 'src/app/api';
import { PaymentService, BuildingService } from 'src/app/api';
import { Title } from '@angular/platform-browser';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as moment from 'moment';

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'MMMM YYYY', // this is the format showing on the input element
    monthYearLabel: 'MMMM YYYY', // this is showing on the calendar
  },
};

@Component({
  selector: 'app-payment-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class FormComponent implements OnInit {
  form: FormGroup;
  buildingList: Building[];
  paymentList: Payment[];

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private titleService: Title,
    private paymentService: PaymentService,
    private buildingService: BuildingService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.createForm();
    this.loadAllBuilding();
    this.loadAllPayment();
  }

  createForm() {
    this.form = this.fb.group({
      buildingId: ['', [Validators.required]],
      date: new FormControl(moment()),
    });
    this.setTitle('Sistema de ponto - funcionário');
  }

  loadAllPayment() {
    this.paymentService.getAllPayment().subscribe({
      next: (resp) => {
        this.paymentList = resp as Payment[];
      },
      error: (err) => {
        const msg = err.error?.message ? err.error.message : 'Tente novamente em instantes.';
        this.snackBar.open(msg, 'Erro', { duration: 5000 });
      },
    });
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

  setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  chosenYearHandler(normalizedYear: moment.Moment) {
    const ctrlValue = moment();
    ctrlValue.year(normalizedYear.year());
    this.form.get('date').setValue(ctrlValue);
  }

  chosenMonthHandler(normalizedMonth: moment.Moment, datepicker) {
    const ctrlValue = this.form.get('date').value;
    ctrlValue.month(normalizedMonth.month());
    this.form.get('date').setValue(ctrlValue);

    datepicker.close();
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    this.form.get('date').setValue(moment(this.form.get('date').value).format('yyyy-MM'));
    const payment: PaymentDTO = this.form.value;

    this.paymentService.insert(payment).subscribe({
      next: (resp) => {
        this.snackBar.open('Salvo!', 'Sucesso', { duration: 5000 });
        window.location.reload();
      },
      error: (err) => {
        const msg = err.error?.message ? err.error.message : 'Tente novamente em instantes.';
        this.snackBar.open(msg, 'Erro', { duration: 5000 });
      },
    });
  }
}
