import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Car } from '../models/Car';

@Injectable({
  providedIn: 'root', // Makes it a standalone service
})
export class CarService {
  private readonly apiUrl = `${environment.apiUrl}/Car`; // Replace with your actual API endpoint

  constructor(private http: HttpClient) {}

  /**
   * Get all cars
   * @returns Observable<Car[]>
   */
  getCars(): Observable<Car[]> {
    // debugger;
    console.log('getCars');
    return this.http.get<Car[]>(`${this.apiUrl}`);
  }

  /**
   * Get a car by ID
   * @param id Car ID
   * @returns Observable<Car>
   */
  getCarById(id: number): Observable<Car> {
    return this.http.get<Car>(`${this.apiUrl}/${id}`);
  }

  /**
   * Add a new car
   * @param car Car data
   * @returns Observable<Car>
   */
  addCar(car: Car): Observable<Car> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    console.log(car)
    return this.http.post<Car>(this.apiUrl, car, { headers });
  }

  /**
   * Update an existing car
   * @param car Car data
   * @returns Observable<void>
   */
  updateCar(car: Car): Observable<void> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<void>(`${this.apiUrl}/${car.carID}`, car, { headers });
  }

  /**
   * Delete a car by ID
   * @param id Car ID
   * @returns Observable<void>
   */
  deleteCar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
