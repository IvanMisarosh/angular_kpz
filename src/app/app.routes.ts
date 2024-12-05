import { Routes } from '@angular/router';
import { CarListComponent } from './feature/car-list/car-list.component';
import { CarFormComponent } from './feature/car-form/car-form.component';
import { LoginComponent } from './feature/login/login.component'; // Import your login component
import { CustomerListComponent } from './feature/customer-list/customer-list.component';
import { CustomerFormComponent } from './feature/customer-form/customer-form.component';
import { AuthGuard } from './core/guards/auth.guard'; // Import the AuthGuard

export const routes: Routes = [
  {
    path: 'car',
    component: CarListComponent
  },
  {
    path: 'car/update/:id',
    component: CarFormComponent
  },
  {
    path: 'car/add',
    component: CarFormComponent
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    redirectTo: '/car',
    pathMatch: 'full',
  },
  {
    path: 'customer',
    component: CustomerListComponent
  },
  {
    path: 'customer/update/:id',
    component: CustomerFormComponent
  },
  {
    path: 'customer/add',
    component: CustomerFormComponent
  },
  {
    path: '**',
    // redirectTo: '/login', // Handle any unknown routes
    redirectTo: '/car'
  }
];

// export const routes: Routes = [
//   {
//     path: 'car',
//     component: CarListComponent,
//     canActivate: [AuthGuard] // Protect the car list route with the AuthGuard
//   },
//   {
//     path: 'car/update/:id',
//     component: CarFormComponent,
//     canActivate: [AuthGuard] // Protect the update route with the AuthGuard
//   },
//   {
//     path: 'car/add',
//     component: CarFormComponent,
//     canActivate: [AuthGuard] // Protect the add car route with the AuthGuard
//   },
//   {
//     path: 'login',
//     component: LoginComponent, // Make the login route accessible to all users
//   },
//   {
//     path: '',
//     redirectTo: '/car',
//     pathMatch: 'full',
//   },
//   {
//     path: '**',
//     redirectTo: '/login', // Handle any unknown routes
//   }
// ];
