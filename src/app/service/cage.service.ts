import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {EmployeeNameDTO} from "../model/dto/employee-name-dto";
import {Entities} from "../model/entities";
import {Cage} from "../model/cage";
import {Employee} from "../model/employee";
import {EmployeeDto} from "../model/employeeDto";

@Injectable({
  providedIn: 'root'
})
export class CageService {
  private subject = new BehaviorSubject("");
  public apiURL = 'http://localhost:8080/employee/cage';
  constructor(private http : HttpClient) { }

  findAllPageAble(page : number,sort : string,type:boolean){
    return this.http.get(this.apiURL+'/?sort='+sort+'&type='+type+'&page='+page)
  }
  findCage(page : number,dateType:string, dateFrom : string, dateTo : string, searchCageId : string, employee:string,type : boolean, sort:string): Observable<any>{
    return this.http.get(this.apiURL+'/search/?dateType='+dateType+'&dateFrom='+dateFrom +'&dateTo='+dateTo +'&searchCageId='+searchCageId +'&employee='+employee+'&sort='+sort+'&type='+type+'&page='+page)
  }

  findAllEntitiesInCage(cageId : string){
    this.subject.next(cageId);
  }
  getCageIdFromCageComponent(): Observable<string>{
    return this.subject.asObservable();
  }
  getAllEmployeeName():Observable<any> {
    return this.http.get<EmployeeNameDTO[]>(this.apiURL + '/get_employee');
  }

  createCage(value: Cage): Observable<any> {
    return this.http.post<any>(this.apiURL + "/create", value);
  }


  findById(id: String): Observable<any> {
    return this.http.get<any>(this.apiURL + "/edit/" + id);
  }


  updateCage(id: number, cage: Cage): Observable<any> {
    return this.http.patch<Cage>(this.apiURL + "/edit/" + id, cage);
  }

  getListEmployee(): Observable<any>{
    return this.http.get<Employee[]>(this.apiURL + "/listEmployee")
  }

  getCageIdForCreate(): Observable<number> {
    return this.http.get<number>(this.apiURL + "/createId");
  }

  getCurrentEmployeeCreateCage(user: string): Observable<any> {
    return this.http.get<any>(this.apiURL + "/username/" + user );
  }

  sendUsernameForCreateCage(username: string){
    this.subject.next(username)
  }

  getUsernameForCageComponent(): Observable<string>{
    return this.subject.asObservable();
  }


}
