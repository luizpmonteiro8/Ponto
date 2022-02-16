import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../../environments/environment';
import { HttpUtilService } from '../index';

import { Building } from '..';

@Injectable()
export class BuildingService {
  private readonly PATH: string = 'building';

  constructor(private http: HttpClient, private httpUtil: HttpUtilService) {}

  getAllBuilding(): Observable<any> {
    return this.http.get(env.baseUrl + this.PATH, this.httpUtil.headers());
  }

  insert(building: Building): Observable<any> {
    return this.http.post(env.baseUrl + this.PATH, building, this.httpUtil.headers());
  }

  update(building: Building): Observable<any> {
    return this.http.put(env.baseUrl + this.PATH + '/' + building.id, building, this.httpUtil.headers());
  }

  remove(id: number): Observable<any> {
    return this.http.delete(env.baseUrl + this.PATH + '/' + id, this.httpUtil.headers());
  }
}
