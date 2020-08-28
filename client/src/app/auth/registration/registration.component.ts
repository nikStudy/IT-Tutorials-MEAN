import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  datasaved: boolean = false;
  message: string;
  regForm: FormGroup;

  constructor(private employeeservice: EmployeeService, private formbuilder: FormBuilder) { }

  ngOnInit(): void {
    this.setFormState();
  }

  setFormState():void {
    this.regForm = this.formbuilder.group({
      firstname: [null, Validators.required],
      lastname: [null, Validators.required],
      emailid: [null, Validators.compose([Validators.required, Validators.email])],
      password: [null, Validators.required]
    });
  }

  postdata() {
    let employee = this.regForm.value;
    console.log(employee);

    this.message = '';
    this.createNewEmployee(employee);
  }

  createNewEmployee(employee: Employee){
    this.employeeservice.createEmployee(employee).subscribe(data =>{
      this.datasaved = true;
      this.regForm.reset();
      console.log(data);
      this.message = data.message;
    });
  }

}
