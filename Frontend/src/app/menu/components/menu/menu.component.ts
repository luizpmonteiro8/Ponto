import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  home() {
    this.router.navigate(['/']);
  }

  list(type) {
    switch (type) {
      case 'job':
        this.router.navigate(['/cargo/listagem']);
        break;
      case 'employee':
        this.router.navigate(['/funcionario/listagem']);
        break;
      case 'building':
        this.router.navigate(['/construcao/listagem']);
        break;
      default:
        this.router.navigate(['/']);
        break;
    }
  }

  registration(type) {
    switch (type) {
      case 'job':
        this.router.navigate(['/cargo']);
        break;
      case 'employee':
        this.router.navigate(['/funcionario']);
        break;
      case 'building':
        this.router.navigate(['/construcao']);
        break;
      case 'buildingEmployee':
        this.router.navigate(['/funcionarioconstrucao']);
        break;
      case 'entry':
        this.router.navigate(['/lancamento']);
        break;
      default:
        this.router.navigate(['/']);
        break;
    }
  }

  report(type) {
    switch (type) {
      case 'payment':
        this.router.navigate(['/salario']);
        break;
      default:
        this.router.navigate(['/']);
        break;
    }
  }

  logout() {
    delete localStorage['token'];
    this.home();
  }

  isAutheticaded(): boolean {
    return localStorage['token'];
  }
}
