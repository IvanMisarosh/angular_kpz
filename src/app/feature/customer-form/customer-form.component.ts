import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../../shared/services/customer.service';
// import { Customer } from '../../shared/models/Customer';
import { NgIf} from '@angular/common';

@Component({
  selector: 'app-customer-form',
    imports: [
      ReactiveFormsModule,
      NgIf
    ],
  templateUrl: './customer-form.component.html',
  standalone: true,
  styleUrl: './customer-form.component.scss'
})
export class CustomerFormComponent implements OnInit {
  customerForm!: FormGroup;
  isEditMode: boolean = false;
  customerId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private route: ActivatedRoute,  // Inject ActivatedRoute to get route params
    private router: Router
  ) {}

  ngOnInit(): void {
    this.customerForm = this.fb.group({
      customerID: [0],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]]
    });

    this.route.paramMap.subscribe(params => {
      this.customerId = +params.get('id')!;
      if (this.customerId) {
        this.isEditMode = true;
        this.loadCustomerData(this.customerId);
      }
    });
  }

  loadCustomerData(customerId: number): void {
    this.customerService.getCustomerById(customerId).subscribe({
      next: res => {
        this.customerForm.patchValue(res);
      },
      error: err => {
        console.log(err);
      }
    });
  }

  onSubmit(): void {
    if (this.customerForm.valid) {
      if (this.isEditMode) {
        this.customerService.updateCustomer(this.customerForm.value).subscribe({
          next: res => {
            this.router.navigate(['/customer']);
          },
          error: err => {
            console.log(err);
          }
        });
      } else {
        this.customerService.addCustomer(this.customerForm.value).subscribe({
          next: res => {
            this.router.navigate(['/customer']);
          },
          error: err => {
            console.log(err);
          }
        });
      }
    }
  }

}
