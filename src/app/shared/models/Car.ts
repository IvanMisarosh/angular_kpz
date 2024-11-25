import {CarModel} from './CarModel';
import {Color} from './Color';
import {Customer} from './Customer';

export class Car {
  carID: number;
  customerID: number;
  carModelID: number;
  colorID: number;
  manufactureYear?: number;
  note?: string;
  vin?: string;
  mileage?: number;

  // Навігаторські властивості
  carModel!: CarModel;
  color!: Color;
  customer!: Customer;
}

