import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../../environments/environment';

import { User } from '../';

@Injectable()
export class SignUpService {
  private readonly PATH: string = 'signup';

  constructor(private http: HttpClient) {}

  signUp(user: User): Observable<any> {
    return this.http.post(env.baseUrl + this.PATH, user, { observe: 'response' });
  }
}
