import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../../environments/environment';
import { HttpUtilService } from '../index';

import { Payment, PaymentDTO } from '..';

@Injectable()
export class PaymentService {
  private readonly PATH: string = 'payment';

  constructor(private http: HttpClient, private httpUtil: HttpUtilService) {}

  getAllPayment(): Observable<any> {
    return this.http.get(env.baseUrl + this.PATH, this.httpUtil.headers());
  }

  insert(payment: PaymentDTO): Observable<any> {
    return this.http.post(env.baseUrl + this.PATH, payment, this.httpUtil.headers());
  }

  update(payment: PaymentDTO): Observable<any> {
    return this.http.put(env.baseUrl + this.PATH, payment, this.httpUtil.headers());
  }

  remove(id: number): Observable<any> {
    return this.http.delete(env.baseUrl + this.PATH + '/' + id, this.httpUtil.headers());
  }
}
