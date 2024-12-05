import { Pipe, PipeTransform } from '@angular/core';
import { Customer } from '../models/Customer'; // Adjust the path as per your project structure

@Pipe({
  standalone: true,
  name: 'fullName'
})
export class FullNamePipe implements PipeTransform {
  transform(customer: Customer): string {
    return `${customer.firstName} ${customer.lastName}`;
  }
}
