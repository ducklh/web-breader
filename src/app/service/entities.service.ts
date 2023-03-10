import {Injectable} from '@angular/core';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {Observable} from "rxjs";
import {Entities} from "../model/entities";


@Injectable({
  providedIn: 'root'
})
export class EntitiesService {
  public apiURL = 'http://localhost:8080/employee/entities';
  constructor(private http: HttpClient) {
  }

  createEntities(value: Entities): Observable<any> {
    return this.http.post<any>(this.apiURL + "/create", value);
  }


  findById(id: String): Observable<any> {
    return this.http.get<any>(this.apiURL + "/update/" + id);
  }

  updateEntities(id: number, entities: Entities): Observable<any> {
    return this.http.patch<Entities>(this.apiURL + "/update/" + id, entities);
  }

  getListCage(): Observable<any> {
    return this.http.get<String[]>(this.apiURL + "/create");
  }

  getEntitiesId(cageId: String): Observable<Number> {
    console.log(cageId);
    return this.http.get<Number>(this.apiURL + "/createId/" + cageId);
  }

  findAll(): Observable<Entities[]> {
    return this.http.get<Entities[]>(this.apiURL);
  }

  findAllPageable(page: number) {
    return this.http.get(this.apiURL + '?page=' + page);
  }

  findByIdToDelete(id: string): Observable<Entities> {
    return this.http.get<Entities>(this.apiURL + "/delete/" + id);
  }

  deleteEntitiesById(id: string) {
    console.log("2: " + id)
    // let entities:Observable<Entities>;
    // entities =this.findById(id);
    return this.http.patch(this.apiURL + "/delete/" + id, null);
  }
  searchEntities(inDateMin: string,inDateMax:string,cageId: string) {
    return this.http.get(this.apiURL + "/search?inDateMin="+inDateMin+"&inDateMax="+inDateMax+"&cage="+cageId );
  }
}
