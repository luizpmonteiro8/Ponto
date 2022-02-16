import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Employee, EmployeeDTO, Job } from 'src/app/api';
import { EmployeeService, JobService, CepService } from 'src/app/api';
import { Title } from '@angular/platform-browser';
import { CpfValidator } from 'src/app/shared';

import { formatNumberOnWrite } from './../../../shared/util/formatNumber';
import { formatNumberWithDot } from './../../../shared/util/convertNumber';

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
    private cepService: CepService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.createForm();
    this.loadAllJob();
    this.loadEmployeeByState();
  }

  createForm() {
    this.form = this.fb.group({
      id: [''],
      name: ['', [Validators.required]],
      cpf: ['', [Validators.required]],
      salary: ['', [Validators.min(0.01), Validators.required]],
      jobId: ['', [Validators.min(1), Validators.required]],
      address: this.fb.group({
        id: [''],
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

  loadEmployeeByState() {
    if (history.state.employee) {
      const employee: Employee = history.state.employee;
      employee.salary = formatNumberOnWrite(employee.salary.toFixed(2));
      this.form.get('jobId').setValue(employee.job.id);
      this.form.patchValue({ ...employee });
    }
  }

  setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  changeTextForJobId($event) {
    if (isNaN(this.form.value.jobId)) {
      const result = this.jobList.filter((item) => {
        return item.name == this.form.value.jobId;
      })[0]?.id;

      this.form.value.jobId = result || '';

      if (!result) $event.target.value = '';
    }
  }

  displayFn(id: number): string {
    return this.jobList?.filter((item) => {
      return item.id == id;
    })[0].name;
  }

  addressByCep(event) {
    const cep = event.target.value;

    if (cep.length == 9) {
      this.cepService.getAddressByCep(cep).subscribe({
        next: (resp) => {
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

  formatNumber($event) {
    const number = $event.target.value;
    const result = formatNumberOnWrite(number);
    $event.target.value = result;
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    const employee: EmployeeDTO = this.form.value;
    employee.salary = formatNumberWithDot(employee.salary);
    console.log(employee.salary);

    if (employee.id > 0) {
      this.employeeService.update(employee).subscribe({
        complete: () => {
          this.snackBar.open('Alterado id ' + employee.id, 'Sucesso', { duration: 5000 });
          this.router.navigate(['/funcionario/listagem']);
        },
        error: (err) => {
          const msg = err.error?.message ? err.error.message : 'Tente novamente em instantes.';
          this.snackBar.open(msg, 'Erro', { duration: 5000 });
        },
      });
    } else {
      delete employee.address.id;
      this.employeeService.insert(employee).subscribe({
        next: (resp) => {
          this.snackBar.open('Salvo com id ' + resp.id, 'Sucesso', { duration: 5000 });
          this.router.navigate(['/funcionario/listagem']);
        },
        error: (err) => {
          const msg = err.error?.message ? err.error.message : 'Tente novamente em instantes.';
          this.snackBar.open(msg, 'Erro', { duration: 5000 });
        },
      });
    }
  }
}
