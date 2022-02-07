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
