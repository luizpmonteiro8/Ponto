import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { HttpUtilService } from '../index';

@Injectable()
export class CepService {
  private readonly PATH: string = 'https://viacep.com.br/ws/{cep}/json/';

  constructor(private http: HttpClient, private httpUtil: HttpUtilService) {}

  getAddressByCep(cep): Observable<any> {
    return this.http.get(this.PATH.replace('{cep}', cep));
  }
}
