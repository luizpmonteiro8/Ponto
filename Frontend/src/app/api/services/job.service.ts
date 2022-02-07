import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../../environments/environment';
import { HttpUtilService } from '../index';

import { Job } from '..';

@Injectable()
export class JobService {
  private readonly PATH: string = 'job';

  constructor(private http: HttpClient, private httpUtil: HttpUtilService) {}

  getAllJob(): Observable<any> {
    return this.http.get(env.baseUrl + this.PATH, this.httpUtil.headers());
  }

  insert(job: Job): Observable<any> {
    return this.http.post(env.baseUrl + this.PATH, job, this.httpUtil.headers());
  }

  update(job: Job): Observable<any> {
    return this.http.put(env.baseUrl + this.PATH, job, this.httpUtil.headers());
  }

  remove(id: number): Observable<any> {
    return this.http.delete(env.baseUrl + this.PATH + '/' + id, this.httpUtil.headers());
  }
}
