import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../../environments/environment';

import { Credential } from '../';

@Injectable()
export class LoginService {
  private readonly PATH: string = 'signin';

  constructor(private http: HttpClient) {}

  signIn(credential: Credential): Observable<any> {
    return this.http.post(env.baseUrl + this.PATH, credential, { observe: 'response' });
  }
}
