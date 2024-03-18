import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VehicleModel } from './data.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  url = "https://628509cba48bd3c40b79fb8d.mockapi.io/api/vehicle";

  constructor(private http: HttpClient) { }

  fetchData(): Observable<VehicleModel[]> {
    return this.http.get<VehicleModel[]>(this.url);
  }


  fetchDataById(id: any): Observable<VehicleModel> {
    return this.http.get<VehicleModel>(this.url +"/"+id);
  }

  add(a: number, b: number): number {
    return a+b;
  }


}
