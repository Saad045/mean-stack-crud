import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MyDataServiceService } from './../../service/my-data-service.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  public form: FormGroup;

  constructor(private formBuilder: FormBuilder, private service: MyDataServiceService, private router: Router) { 
    this.form = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    // this.initializeForm();
  }

  // To initialize Form
  // initializeForm() {
  //   this.form = this.formBuilder.group({
  //     firstName: ['', [Validators.required]],
  //     lastName: ['', [Validators.required]],
  //     email: ['', [Validators.required]],
  //     phone: ['', [Validators.required]],
  //   });
  // }

  // Add Employee When Submit Button Is Clicked
  addEmployee() {
    if (this.form.valid) {
      let data = this.form.value;
      this.service.addEmployee(data).subscribe(() => {
        this.router.navigate(['/crud']);
      });
    }
  }

  goHome() {
    this.router.navigate([`/crud`]);
  }
}
