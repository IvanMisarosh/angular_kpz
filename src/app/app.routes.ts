import { Routes } from '@angular/router';
import { CarListComponent} from './feature/car-list/car-list.component';
import { CarFormComponent} from './feature/car-form/car-form.component';

export const routes: Routes = [
  {path: 'car', component: CarListComponent},
  {path: 'car/update/:id', component: CarFormComponent},
  {path: 'car/add', component: CarFormComponent},
  {path: '', redirectTo: '/car', pathMatch: 'full'},
];
