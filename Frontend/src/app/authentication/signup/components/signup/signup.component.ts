import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SignUpService } from 'src/app/api';
import { User } from 'src/app/api';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private titleService: Title,
    private signUpService: SignUpService,
  ) {}

  createForm() {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
    this.setTitle('Cadastro de usuário');
  }

  setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  ngOnInit(): void {
    this.createForm();
  }

  signUp() {
    if (this.form.invalid) {
      return;
    }

    const user: User = this.form.value;
    this.signUpService.signUp(user).subscribe({
      next: () => {
        const msg = 'Realize o login para acessar o sistema.';
        this.snackBar.open(msg, 'Sucesso', { duration: 5000 });
        this.router.navigate(['/login']);
      },
      error: (err) => {
        const msg = err.error?.message ? err.error.message : 'Tente novamente em instantes.';
        this.snackBar.open(msg, 'Erro', { duration: 5000 });
      },
    });
  }
}
