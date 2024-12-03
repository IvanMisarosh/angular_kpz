import {CarModel} from './CarModel';
import {Color} from './Color';
import {Customer} from './Customer';

export class Car {
  carID: number;
  customerID: number;
  carModelID?: number;
  colorID: number;
  manufactureYear: number;
  note?: string;
  vin: string;
  mileage?: number;

  // Навігаторські властивості
  carModel!: CarModel;
  color!: Color;
  customer!: Customer;

  constructor(
    carID: number,
    customerID: number,
    colorID: number,
    manufactureYear: number,
    vin: string,
    carModel?: CarModel,
    color?: Color,
    customer?: Customer,
    note?: string,
    mileage?: number
  ) {
    this.carID = carID;
    this.customerID = customerID;
    this.colorID = colorID;
    this.manufactureYear = manufactureYear;
    this.vin = vin;
    this.carModel = carModel!;
    this.color = color!;
    this.customer = customer!;
    this.note = note;
    this.mileage = mileage;
  }
}

