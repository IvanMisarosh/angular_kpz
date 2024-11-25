import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-car-form',
  standalone: true,
  templateUrl: './car-form.component.html',
  styleUrls: ['./car-form.component.scss']
})
export class CarFormComponent {
  carId: number | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // Retrieve the ID from the route if present
    this.carId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.carId) {
      console.log(`Editing car with ID: ${this.carId}`);
      // Load the car data here
    } else {
      console.log('Creating a new car');
    }
  }
}
