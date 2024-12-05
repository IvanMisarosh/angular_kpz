import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from '../../shared/models/Customer';
import { CustomerService } from '../../shared/services/customer.service';
import {NgForOf} from '@angular/common';


@Component({
  selector: 'app-customer-list',
  imports: [
    NgForOf
  ],
  templateUrl: './customer-list.component.html',
  standalone: true,
  styleUrl: './customer-list.component.scss'
})
export class CustomerListComponent implements OnInit {
  customerList: Customer[] = [];
  selectedCustomer: Customer | null = null;
  paginatedCustomers: Customer[] = [];

  // Pagination parameters
  currentPage: number = 1;
  itemsPerPage: number = 5; // Number of records per page
  totalPages: number = 1;

  constructor(private customerService: CustomerService, private router: Router) {}

  ngOnInit(): void {
    this.customerService.getCustomers().subscribe({
      next: res => {
        this.customerList = res as Customer[];
        this.updatePagination();
      },
      error: err => {
        console.log(err);
      }
    });
  }

  selectCustomer(customer: Customer): void {
    this.selectedCustomer = customer;
  }

  navigateToAdd(): void {
    this.router.navigate(['/customer/add']);
  }

  navigateToEdit(): void {
    if (this.selectedCustomer) {
      // Navigate to the edit page for the selected customer
      this.router.navigate(['/customer/update', this.selectedCustomer.customerID]);
    }
  }

  navigateToDelete(): void {
    if (this.selectedCustomer) {
      // Navigate to the delete page for the selected customer
      this.customerService.deleteCustomer(this.selectedCustomer.customerID).subscribe({
        next: res => {
          console.log(res);
          this.customerList = this.customerList.filter(c => c.customerID !== this.selectedCustomer?.customerID);
          this.updatePagination();
        },
        error: err => {
          console.log(err);
        }
      });
    }
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.customerList.length / this.itemsPerPage);
    this.paginatedCustomers = this.customerList.slice((this.currentPage - 1) * this.itemsPerPage, this.currentPage * this.itemsPerPage);
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.updatePagination();
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
