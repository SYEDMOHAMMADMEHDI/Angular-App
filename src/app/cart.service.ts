import { Injectable } from '@angular/core';
import { VehicleModel } from './data.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  url="https://628509cba48bd3c40b79fb8d.mockapi.io/api/vehicle";

  constructor(private http:HttpClient) { }

  fetchData():Observable<VehicleModel[]> { 
    return this.http.get<VehicleModel[]>(this.url);
}

}
