import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Employee, Job } from 'src/app/api';
import { EmployeeService, JobService, CepService } from 'src/app/api';
import { Title } from '@angular/platform-browser';
import { CpfValidator } from 'src/app/shared';

@Component({
  selector: 'app-employee-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  form: FormGroup;
  jobList: Job[];

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private titleService: Title,
    private employeeService: EmployeeService,
    private jobService: JobService,
    private cepService: CepService, //,
  ) /*private router: Router*/ {}

  ngOnInit() {
    this.loadAllJob();
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      id: new FormControl({ value: '', disabled: true }),
      name: ['', [Validators.required]],
      cpf: ['', [Validators.required]],
      salary: ['', [Validators.min(0.01), Validators.required]],
      jobId: ['', [Validators.min(1), Validators.required]],
      address: this.fb.group({
        street: ['', Validators.required],
        number: ['', Validators.required],
        district: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        zipcode: ['', Validators.required],
      }),
    });
    this.setTitle('Sistema de ponto - funcionário');
  }

  loadAllJob() {
    this.jobService.getAllJob().subscribe({
      next: (resp) => {
        this.jobList = resp as Job[];
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

  onBlurMethodChangeTextForJobId($event) {
    if (isNaN(this.form.value.jobId)) {
      const result = this.jobList.filter((item) => {
        return item.name == this.form.value.jobId;
      })[0]?.id;

      this.form.value.jobId = result || '';

      if (!result) $event.target.value = '';
    }
  }

  displayFn(id: number): string {
    return this.jobList.filter((item) => {
      return item.id == id;
    })[0].name;
  }

  addressByCep(event) {
    const cep = event.target.value;

    if (cep.length == 9) {
      this.cepService.getAddressByCep(cep).subscribe({
        next: (resp) => {
          console.log(resp);
          this.form.get('address.street').setValue(resp.logradouro);
          this.form.get('address.district').setValue(resp.bairro);
          this.form.get('address.city').setValue(resp.localidade);
          this.form.get('address.state').setValue(resp.uf);
        },
        error: (err) => {
          const msg = err.error?.message ? err.error.message : 'Tente novamente em instantes.';
          this.snackBar.open(msg, 'Erro', { duration: 5000 });
        },
      });
    }
  }

  insertJob() {
    if (this.form.invalid) {
      return;
    }
    const employee: Employee = this.form.value;
    console.log(employee.salary.toLocaleString('en-US', { minimumFractionDigits: 2 }));

    employee.salary = Number(employee.salary.toLocaleString('en-US', { minimumFractionDigits: 2 }));
    this.employeeService.insert(employee).subscribe({
      next: (resp) => {
        this.snackBar.open('Salvo com id ' + resp.id, 'Sucesso', { duration: 5000 });
      },
      error: (err) => {
        const msg = err.error?.message ? err.error.message : 'Tente novamente em instantes.';
        this.snackBar.open(msg, 'Erro', { duration: 5000 });
      },
    });
  }
}
