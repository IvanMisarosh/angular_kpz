import { Pipe, PipeTransform } from '@angular/core';
import { Customer } from '../models/Customer';
import { DropDownsService } from '../services/dropdown.service';

@Pipe({
  name: 'employee',
  standalone: true
})
export class CustomerPipe implements PipeTransform {
  constructor(public dropDownsService: DropDownsService) {

  }

  list: Customer[] = [];

  transform(value: Number): string {
    this.dropDownsService.getCustomers().subscribe({
      next: res => {
        this.list = res as Customer[];
      }
    });
    const emp = this.list.find(e => e.customerID === value);
    return `${emp?.firstName ?? ""} ${emp?.lastName ?? ""}`;
  }
}
