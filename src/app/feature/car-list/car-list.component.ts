import { Component, OnInit, ViewChild } from '@angular/core';
import { CarService } from '../../shared/services/car.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CarModel } from '../../shared/models/CarModel';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-car-list',
  standalone: true,
  imports: [
    MatTableModule,
    MatCheckboxModule,
    MatPaginatorModule,
    DatePipe,
    // Add any custom pipes here, like CarTypePipe if available
  ],
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.scss']
})
export class CarListComponent implements OnInit {
  constructor(private carService: CarService) {}

  carList: CarModel[] = [];
  displayedColumns: string[] = [
    'select',
    'carModel',
    'color',
    'vin',
    'manufactureYear',
    'mileage',
    'note'
  ];

  dataSource = new MatTableDataSource(this.carList);
  selection = new SelectionModel(true, []);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.carService.getCars().subscribe({
      next: res => {
        this.carList = res as CarModel[];
        this.dataSource.data = this.carList;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: err => {
        console.log(err);
      }
    });
  }

  selectHandler(row: CarModel): void {
    this.selection.toggle(row);
  }

  currentPage = 0;

  handlePageEvent(event: PageEvent): void {
    console.log(event, this.currentPage);
  }
}
