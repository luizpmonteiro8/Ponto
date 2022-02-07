import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class HttpUtilService {
  constructor() {}

  headers() {
    let httpHeaders: HttpHeaders = new HttpHeaders();

    if (localStorage['token']) {
      httpHeaders = httpHeaders.set('authorization', localStorage['token']);
    }

    return { headers: httpHeaders };
  }

  getUserId(): string {
    if (!localStorage['token']) {
      return '';
    }
    const user = this.getPayload();
    return user ? user.id : '';
  }

  getUserName(): string {
    if (!localStorage['token']) {
      return '';
    }
    const user = this.getPayload();
    return user ? user.name : '';
  }

  getUserEmail(): string {
    if (!localStorage['token']) {
      return '';
    }
    const user = this.getPayload();
    return user ? user.email : '';
  }

  getPayload() {
    if (!localStorage['token']) {
      return '';
    }
    return JSON.parse(atob(localStorage['token'].split('.')[1]));
  }
}
