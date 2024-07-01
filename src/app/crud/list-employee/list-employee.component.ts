import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MyDataServiceService } from './../../service/my-data-service.service';
import { MatDialog } from '@angular/material/dialog';
// import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { ConfirmDialogComponent } from 'src/app/confirm-dialog/confirm-dialog.component';

export interface Employee {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.css']
})
export class ListEmployeeComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  MyDataSource = new MatTableDataSource<Employee>();
  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'phone', 'action'];

  constructor(private service: MyDataServiceService, private router: Router, public dialog: MatDialog) { }

  ngOnInit() {
    this.getEmployees();
  }

  ngAfterViewInit() {
    // Set up paginator and sort after view initialization
    this.MyDataSource.paginator = this.paginator;
    this.MyDataSource.sort = this.sort;
  }

  // To Get List Of Employees
  getEmployees() {
    this.service.getEmployees().subscribe((data:any) => {
      // Check if data is not empty before assigning it to the data source
      if (data && data.length > 0) {
        this.MyDataSource.data = data;
        // Set paginator and sort after data is assigned to the data source
        this.MyDataSource.paginator = this.paginator;
        this.MyDataSource.sort = this.sort;
      }
    });
  }

  // To Add Employee
  addEmployee() {
    this.router.navigate([`/crud/create`]);
  }

  // To Edit Employee
  editEmployee(empid: any) {
    this.router.navigate([`/crud/edit/${empid}`]);
  }

  // Delete Employee
  // deleteEmployee(empid: any) {
  //   this.service.deleteEmployee(empid).subscribe(() => {
  //     this.getEmployees();
  //   });
  // }
  deleteEmployee(empid: any): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.deleteEmployee(empid).subscribe(() => {
          this.getEmployees();
        });
      }
    });
  }

  // Search specific result
  filterEmployee(searchstring: string) {
    searchstring = searchstring.trim().toLowerCase();
    this.MyDataSource.filter = searchstring;
  }
}























































// import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
// import { Router } from '@angular/router';
// import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
// import { MatSortModule } from '@angular/material/sort';
// import { MatTableModule, MatTableDataSource } from '@angular/material/table';
// import { MyDataServiceService } from './../../service/my-data-service.service';

// export interface Employee {
//   firstName: string;
//   lastName: string;
//   email: string;
//   phone: string;
// }

// @Component({
//   selector: 'app-list-employee',
//   templateUrl: './list-employee.component.html',
//   styleUrls: ['./list-employee.component.css']
// })
// export class ListEmployeeComponent implements OnInit {

//   @ViewChild(MatPaginatorModule) paginator: MatPaginator;
//   @ViewChild(MatSortModule) sort: MatSort;

//   // Important objects
//   MyDataSource: any;
//   employeeList: Employee[];
//   displayedColumns: string[] = ['firstName', 'lastName', 'email', 'phone', 'action'];

//   constructor(private service: MyDataServiceService, private router: Router) {
//   }

//   ngOnInit() {
//     this.getEmployees();
//   }

//   // To Get List Of Employee
//   getEmployees() {
//     this.service
//       .getEmployees()
//       .subscribe((data: Employee[]) => {
//         this.MyDataSource = new MatTableDataSource();
//         this.MyDataSource.data = data;
//         this.MyDataSource.paginator = this.paginator;
//         this.MyDataSource.sort = this.sort;
//       });
//   }

//   // To Edit Employee
//   editEmployee(empid: any) {
//     this.router.navigate([`/Crud/edit/${empid}`]);
//   }

//   // Search specific result
//   filterEmployee(searchstring: string) {
//     searchstring = searchstring.trim();
//     searchstring = searchstring.toLowerCase();
//     this.MyDataSource.filter = searchstring;
//   }
// }




