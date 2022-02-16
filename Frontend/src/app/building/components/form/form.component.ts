import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Building } from 'src/app/api';
import { BuildingService, JobService, CepService } from 'src/app/api';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-building-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private titleService: Title,
    private buildingService: BuildingService,
    private cepService: CepService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.createForm();
    this.loadBuildingByState();
  }

  createForm() {
    this.form = this.fb.group({
      id: ['', []],
      name: ['', [Validators.required]],
      status: [true, [Validators.required]],
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
    this.setTitle('Sistema de ponto - construção');
  }

  loadBuildingByState() {
    if (history.state.building) {
      const building: Building = history.state.building;
      this.form.patchValue({ ...building });
    }
  }

  setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
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

  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    const building: Building = this.form.value;

    if (building.id > 0) {
      this.buildingService.update(building).subscribe({
        complete: () => {
          this.snackBar.open('Alterado id ' + building.id, 'Sucesso', { duration: 5000 });
          this.router.navigate(['/construcao/listagem']);
        },
        error: (err) => {
          const msg = err.error?.message ? err.error.message : 'Tente novamente em instantes.';
          this.snackBar.open(msg, 'Erro', { duration: 5000 });
        },
      });
    } else {
      delete building.address.id;
      this.buildingService.insert(building).subscribe({
        next: (resp) => {
          this.snackBar.open('Salvo com id ' + resp.id, 'Sucesso', { duration: 5000 });
          this.router.navigate(['/construcao/listagem']);
        },
        error: (err) => {
          const msg = err.error?.message ? err.error.message : 'Tente novamente em instantes.';
          this.snackBar.open(msg, 'Erro', { duration: 5000 });
        },
      });
    }
  }
}
