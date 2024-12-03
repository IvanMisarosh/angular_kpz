import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CarService } from '../../shared/services/car.service';
import { DropDownsService } from '../../shared/services/dropdown.service';
import { Car } from '../../shared/models/Car';
import { Customer } from '../../shared/models/Customer';
import { Color } from '../../shared/models/Color';
import { CarModel } from '../../shared/models/CarModel';
import { NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-car-form',
  templateUrl: './car-form.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgForOf
  ],
  styleUrls: ['./car-form.component.scss']
})
export class CarFormComponent implements OnInit {
  carForm!: FormGroup;
  customers: Customer[] = [];
  colors: Color[] = [];
  carModels: CarModel[] = [];
  isEditMode: boolean = false;
  carId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private carService: CarService,
    private dropDownsService: DropDownsService,
    private route: ActivatedRoute,  // Inject ActivatedRoute to get route params
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carForm = this.fb.group({
      carID: [0],
      customerID: [null, Validators.required],
      carModelID: [null],
      colorID: [null, Validators.required],
      manufactureYear: [null, [Validators.required, Validators.min(1886)]], // Valid cars are manufactured after 1886
      vin: ['', [Validators.required, Validators.maxLength(17)]],
      mileage: [null, Validators.min(0)],
      note: ['']
    });

    this.loadDropdownData();

    this.route.paramMap.subscribe(params => {
      this.carId = +params.get('id')!;
      if (this.carId) {
        this.isEditMode = true;
        this.loadCarData(this.carId);
      }
    });
  }

  loadDropdownData() {
    this.dropDownsService.getCustomers().subscribe({
      next: data => (this.customers = data),
      error: err => console.log(err)
    });

    this.dropDownsService.getColors().subscribe({
      next: data => (this.colors = data),
      error: err => console.log(err)
    });

    this.dropDownsService.getCarModels().subscribe({
      next: data => (this.carModels = data),
      error: err => console.log(err)
    });
  }

  loadCarData(carId: number) {
    this.carService.getCarById(carId).subscribe({
      next: data => {
        this.carForm.patchValue(data);  // Populate the form with existing car data
      },
      error: err => {
        console.log(err);
      }
    });
  }

  onSubmit(): void {
    if (this.carForm.valid) {
      const car: Car = this.carForm.value;

      if (this.isEditMode) {
        // Update an existing car
        this.carService.updateCar(car).subscribe(() => {
          // Reset or navigate after success
          this.router.navigate(['../']);
        });
      } else {
        // Add a new car
        this.carService.addCar(car).subscribe(() => {
          // Reset or navigate after success
          this.router.navigate(['../'])
        });
      }
    }
  }
}
