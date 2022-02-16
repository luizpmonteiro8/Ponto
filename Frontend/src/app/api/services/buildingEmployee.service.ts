import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../../environments/environment';
import { HttpUtilService } from '../index';

import { BuildingEmployee } from '..';

@Injectable()
export class BuildingEmployeeService {
  private readonly PATH: string = 'buildingEmployee';

  constructor(private http: HttpClient, private httpUtil: HttpUtilService) {}

  getEmployeeByBuildingId(buildingId): Observable<any> {
    return this.http.get(env.baseUrl + this.PATH + '/' + buildingId, this.httpUtil.headers());
  }

  insert(buildingemployee: BuildingEmployee): Observable<any> {
    return this.http.post(env.baseUrl + this.PATH, buildingemployee, this.httpUtil.headers());
  }

  remove(id: number): Observable<any> {
    return this.http.delete(env.baseUrl + this.PATH + '/' + id, this.httpUtil.headers());
  }
}
