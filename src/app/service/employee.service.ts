import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Employee} from '../model/employee';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  public apiURL = 'http://localhost:8080/admin/employee';

  constructor(private http: HttpClient) { }

  findAll(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiURL}`);
  }

  findAllPageable(page:number){
    return this.http.get(this.apiURL+'?page='+page);
  }

  findById(id: string): Observable<any> {
    return this.http.get<Employee[]>(this.apiURL + '/update/' + id);
  }

  updateEmployee(id: string, employee: Employee): Observable<any> {
    return this.http.patch<Employee>(this.apiURL + '/update/' + id, employee);
  }

  findAllEmployeeName(searchName: string, searchId: string, page:number): Observable<any>{
    console.log(searchName+ "   " + searchId);
    return this.http.get<any>(this.apiURL + '?searchName=' + searchName + '&searchId=' + searchId + '&page=' + page);
  }
}
