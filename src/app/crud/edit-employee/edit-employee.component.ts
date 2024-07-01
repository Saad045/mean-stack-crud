import { Component, OnInit } from '@angular/core';
import { MyDataServiceService } from './../../service/my-data-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// import Employee from '../../../../Model/Employee';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {

  public empid: any;
  // public empid: string;
  // public employeeDetail: Employee;
  public employeeDetail: any;
  public editform: FormGroup;

  constructor(private service: MyDataServiceService, private formBuilder: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe(params => {
      this.empid = params['id'];
    });
    // this.initializeForm();
    this.editform = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.getEmployeeById(this.empid);
  }

  // To Initialize Form
  // initializeForm() {
  //   this.editform = this.formBuilder.group({
  //     firstName: ['', [Validators.required]],
  //     lastName: ['', [Validators.required]],
  //     email: ['', [Validators.required]],
  //     phone: ['', [Validators.required]],
  //   });
  // }

  // To Single Employee Details By ID
  getEmployeeById(empid: any) {
    this.service.getEmployeeById(empid).subscribe(res => {
      this.employeeDetail = res;
      this.editform.patchValue({
        firstName: this.employeeDetail.firstName,
        lastName: this.employeeDetail.lastName,
        email: this.employeeDetail.email,
        phone: this.employeeDetail.phone,
      });
    });
  }

  // To Update Employee Detail
  updateEmployee() {
    if (this.editform.valid) {
      let data = this.editform.value;
      this.service.updateEmployee(this.empid, data).subscribe(() => {
        this.router.navigate(['/crud']);
      });
    }
  }

  goHome() {
    this.router.navigate([`/crud`]);
  }

}
