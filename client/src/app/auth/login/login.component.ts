import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  datasaved: boolean = false;
  message: string;
  loginForm: FormGroup;

  constructor(private employeeservice: EmployeeService, private formbuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    localStorage.removeItem("Employee");
    this.setFormState();
  }

  setFormState():void {
    this.loginForm = this.formbuilder.group({
      emailid: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  checkdata() {
    let employee = this.loginForm.value;
    console.log(employee);

    this.message = '';
    this.loginAdminEmployee(employee);
  }

  loginAdminEmployee(employee: Employee){
    this.employeeservice.loginEmployee(employee).subscribe(data =>{
      this.datasaved = true;
      this.loginForm.reset();
      console.log(data);
      this.message = data.message;
      if(this.message === 'You are now logged in'){
        localStorage.setItem("Employee", JSON.stringify(employee));
        this.router.navigate(['dashboard']);
      }

    });
  }


}
