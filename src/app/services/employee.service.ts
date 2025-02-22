import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../model/Employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  apiUrl = 'http://localhost:3000/employee';
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Employee[]>(this.apiUrl)
  }

  getById(empId: number) {
    return this.http.get<Employee>(this.apiUrl + '/' + empId)
  }

  create(data: Employee) {
    return this.http.post(this.apiUrl, data)
  }

  update(data: Employee) {
    return this.http.put(this.apiUrl + '/' + data.id, data)
  }

  delete(empId: number) {
    return this.http.delete(this.apiUrl + '/' + empId)
  }
}
