import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Building, BuildingEmployee, Employee, EmployeeStatus } from 'src/app/api';
import { BuildingEmployeeService, EmployeeService, BuildingService } from 'src/app/api';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-buildingemployee-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  form: FormGroup;
  employeeList: Employee[];
  buildingList: Building[];
  employeeByBuilding: EmployeeStatus[];

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private titleService: Title,
    private employeeService: EmployeeService,
    private buildingEmployeeService: BuildingEmployeeService,
    private buildingService: BuildingService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.loadAllBuilding();
    this.loadAllEmployee();
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      id: ['', []],
      status: [true, [Validators.required]],
      employeeId: ['', [Validators.required]],
      buildingId: ['', [Validators.required]],
    });
    this.setTitle('Sistema de ponto - funcionário da construção');
  }

  loadAllEmployee() {
    this.employeeService.getAllEmployee().subscribe({
      next: (resp) => {
        this.employeeList = resp as Employee[];
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

  loadAllEmployeeByBuildingId($event) {
    const buildingId = $event.value;

    this.buildingEmployeeService.getEmployeeByBuildingId(buildingId).subscribe({
      next: (resp) => {
        this.employeeByBuilding = resp as EmployeeStatus[];
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

  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    const buildingEmployee: BuildingEmployee = this.form.value;

    this.buildingEmployeeService.insert(buildingEmployee).subscribe({
      next: (resp) => {
        this.loadAllEmployeeByBuildingId({ value: buildingEmployee.buildingId });
        this.snackBar.open('Salvo com id ' + resp.id, 'Sucesso', { duration: 5000 });
      },
      error: (err) => {
        const msg = err.error?.message ? err.error.message : 'Tente novamente em instantes.';
        this.snackBar.open(msg, 'Erro', { duration: 5000 });
      },
    });
  }
}
