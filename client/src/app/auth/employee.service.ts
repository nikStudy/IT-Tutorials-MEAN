import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Employee } from './employee';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  employeeUrl = 'http://localhost:4000/api/employees/';

  constructor(private http: HttpClient) { }

  createEmployee(employee: Employee): Observable<Employee>{
    let httpheader= new HttpHeaders().set('Content-Type', 'Application/Json');
    let options = {
      headers: httpheader
    }
    return this.http.post<Employee>(this.employeeUrl, employee, options);
  }

  loginEmployee(employee: Employee): Observable<Employee>{
    let httpheader= new HttpHeaders().set('Content-Type', 'Application/Json');
    let options = {
      headers: httpheader
    }
    return this.http.post<Employee>(this.employeeUrl + 'login/', employee, options);
  }
  
}
