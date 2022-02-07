import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Job } from 'src/app/api';
import { JobService } from 'src/app/api';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-job-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private titleService: Title,
    private jobService: JobService, //,
    private router: Router,
  ) {}

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      id: new FormControl({ value: null, disabled: true }),
      name: ['', [Validators.required]],
    });
    this.setTitle('Sistema de ponto - cargo');
  }

  setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  insertJob() {
    if (this.form.invalid) {
      return;
    }

    const job: Job = this.form.value;
    this.jobService.insert(job).subscribe({
      next: (resp) => {
        this.snackBar.open('Salvo com id ' + resp.id, 'Sucesso', { duration: 5000 });
        this.router.navigate(['/cargo/listagem']);
      },
      error: (err) => {
        const msg = err.error?.message ? err.error.message : 'Tente novamente em instantes.';
        this.snackBar.open(msg, 'Erro', { duration: 5000 });
      },
    });
  }
}
