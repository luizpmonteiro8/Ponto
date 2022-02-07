import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../../environments/environment';
import { HttpUtilService } from '../index';

import { Employee } from '..';

@Injectable()
export class EmployeeService {
  private readonly PATH: string = 'employee';

  constructor(private http: HttpClient, private httpUtil: HttpUtilService) {}

  getAllEmployee(): Observable<any> {
    return this.http.get(env.baseUrl + this.PATH, this.httpUtil.headers());
  }

  insert(employee: Employee): Observable<any> {
    return this.http.post(env.baseUrl + this.PATH, employee, this.httpUtil.headers());
  }

  update(employee: Employee): Observable<any> {
    return this.http.put(env.baseUrl + this.PATH, employee, this.httpUtil.headers());
  }

  remove(id: number): Observable<any> {
    return this.http.delete(env.baseUrl + this.PATH + '/' + id, this.httpUtil.headers());
  }
}
