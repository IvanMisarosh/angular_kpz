import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CarModel } from '../models/CarModel';
import { Customer } from '../models/Customer';
import { environment } from '../../../environments/environment';
import { Color } from '../models/Color';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DropDownsService {
  private readonly apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getCustomers() : Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.apiUrl}/Customer`);
  }

  getColors() : Observable<Color[]> {
    console.log('getColors');
    return this.http.get<Color[]>(`${this.apiUrl}/Color`);
  }

  getCarModels() : Observable<CarModel[]> {
    return this.http.get<CarModel[]>(`${this.apiUrl}/CarModel`);
  }

}


