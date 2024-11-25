import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CarModel } from '../models/CarModel'; // Adjust the path as necessary

@Injectable({
  providedIn: 'root' // This makes the service available app-wide
})
export class CarService {
  private apiUrl = 'https://localhost:5001/api/Сar'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  // Get list of cars
  getCars(): Observable<CarModel[]> {
    return this.http.get<CarModel[]>(this.apiUrl);
  }

  // Get car by ID
  getCarById(carId: number): Observable<CarModel> {
    return this.http.get<CarModel>(`${this.apiUrl}/${carId}`);
  }

  // Add a new car
  addCar(car: CarModel): Observable<CarModel> {
    return this.http.post<CarModel>(this.apiUrl, car);
  }

  // Update an existing car
  updateCar(carId: number, car: CarModel): Observable<CarModel> {
    return this.http.put<CarModel>(`${this.apiUrl}/${carId}`, car);
  }

  // Delete a car by ID
  deleteCar(carId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${carId}`);
  }
}
