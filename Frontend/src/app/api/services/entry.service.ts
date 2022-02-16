import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../../environments/environment';
import { HttpUtilService } from '../index';

import { Entry, EntryDTO } from '..';

@Injectable()
export class EntryService {
  private readonly PATH: string = 'entry';

  constructor(private http: HttpClient, private httpUtil: HttpUtilService) {}

  getAllEntry(): Observable<any> {
    return this.http.get(env.baseUrl + this.PATH, this.httpUtil.headers());
  }

  getEntryByEmployeeId(id: number): Observable<any> {
    return this.http.get(env.baseUrl + this.PATH + '/' + id, this.httpUtil.headers());
  }

  insert(entry: EntryDTO): Observable<any> {
    return this.http.post(env.baseUrl + this.PATH, entry, this.httpUtil.headers());
  }

  update(entry: EntryDTO): Observable<any> {
    return this.http.put(env.baseUrl + this.PATH + '/' + entry.id, entry, this.httpUtil.headers());
  }

  remove(id: number): Observable<any> {
    return this.http.delete(env.baseUrl + this.PATH + '/' + id, this.httpUtil.headers());
  }
}
