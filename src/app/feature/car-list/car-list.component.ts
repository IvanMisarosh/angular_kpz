import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarService } from '../../shared/services/car.service';
import { Car } from '../../shared/models/Car';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.scss'],
  imports: [
    NgForOf
  ],
  standalone: true
})
export class CarListComponent implements OnInit {
  carList: Car[] = [];
  selectedCar: Car | null = null;
  paginatedCars: Car[] = [];

  // Параметри пагінації
  currentPage: number = 1;
  itemsPerPage: number = 5; // Кількість записів на сторінку
  totalPages: number = 1;


  constructor(private carService: CarService, private router: Router) {}

  ngOnInit(): void {
    this.carService.getCars().subscribe({
      next: res => {
        this.carList = res as Car[];
        this.updatePagination();
      },
      error: err => {
        console.log(err);
      }
    });
  }

  selectCar(car: Car): void {
    this.selectedCar = car;
  }

  navigateToAdd(): void {
    this.router.navigate(['/car/add']);
  }

  navigateToEdit(): void {
    if (this.selectedCar) {
      // Navigate to the edit page for the selected car
      this.router.navigate(['/car/update', this.selectedCar.carID]);
    }
  }

  navigateToDelete(): void {
    if (this.selectedCar) {
      // Navigate to the delete page for the selected car
      this.carService.deleteCar(this.selectedCar.carID).subscribe({
        next: res => {
          // Remove the car from the list
          this.carList = this.carList.filter(car => car.carID !== this.selectedCar?.carID);
          this.selectedCar = null;
        },
        error: err => {
          console.log(err);
        }
      });

    }
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.carList.length / this.itemsPerPage);
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedCars = this.carList.slice(startIndex, endIndex);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }
}
