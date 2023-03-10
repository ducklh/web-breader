import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { News } from '../model/news';
import { Observable } from 'rxjs';
import { NewsComment } from '../model/comment';
import { NewsCreateCommentDTO } from '../model/dto/comment-create-dto';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  public apiURL = 'http://localhost:8080/api/public/news';
  constructor(private http: HttpClient) { }
  findAll(): Observable<News[]> {
    console.log(this.http.get<News[]>(this.apiURL));
    return this.http.get<News[]>(`${this.apiURL}`);
  }
  findAllPageable(page: number) {
    console.log(this.http.get(this.apiURL + '?page=' + page).subscribe);
    console.log(typeof (this.http.get(this.apiURL + '?page=' + page).subscribe));

    return this.http.get(this.apiURL + '?page=' + page);
  }
  findByName(name: String, page: number): Observable<any> {
    console.log(this.apiURL + '?search=' + name + "&page=" + page);
    return this.http.get<News[]>(this.apiURL + '?search=' + name + "&page=" + page + '&type=nor');
  }
  findByNameDesc(name: String, page: number): Observable<any> {
    console.log(this.apiURL + '?search=' + name + "&page=" + page);
    return this.http.get<News[]>(this.apiURL + '?search=' + name + "&page=" + page + '&type=date');
  }
  findByNameAsc(name: String, page: number): Observable<any> {
    console.log(this.apiURL + '?search=' + name + "&page=" + page);
    return this.http.get<News[]>(this.apiURL + '?search=' + name + "&page=" + page + '&type=asc');
  }
  findByNameTotalView(name: String, page: number): Observable<any> {
    console.log(this.apiURL + '?search=' + name + "&page=" + page);
    return this.http.get<News[]>(this.apiURL + '?search=' + name + "&page=" + page + '&type=views');
  }
  findAllHightLight(page: number): Observable<News[]> {
    console.log((this.apiURL + '/hl?page=' + page));
    return this.http.get<News[]>(`${this.apiURL + '/hl?page=' + page}`);
  }
  findByTotalView(page: number): Observable<News[]> {
    console.log((this.apiURL + '/view?page=' + page));
    return this.http.get<News[]>(`${this.apiURL + '/view?page=' + page}`);
  }
  showDetailNews(id: String): Observable<News[]> {
    console.log((this.apiURL + '/detail/' + id));
    // console.log(this.http.get<News[]>(`${this.apiURL+ '/detail/'+id }`));
    return this.http.get<News[]>(`${this.apiURL + '/detail/' + id}`);
  }
  statisticalTotalViewsByType(): Observable<Object[]> {
    console.log((this.apiURL + '/statistical'));
    console.log(typeof (this.http.get<Object[]>(`${this.apiURL + '/statistical'}`)));

    // console.log(this.http.get<News[]>(`${this.apiURL+ '/detail/'+id }`));
    return this.http.get<Object[]>(`${this.apiURL + '/statistical'}`);
  }
  findCommetnByIdNew(id: String): Observable<any> {
    console.log(this.apiURL + '/comment' + '?id=' + id + "&page=0");
    return this.http.get<NewsComment[]>(this.apiURL + '/comment' + '?id=' + id + "&page=0");
  }
  findUser(id: String): Observable<any> {
    console.log(this.apiURL + '/inforUser' + '?id=' + id);
    return this.http.get<any>(this.apiURL + '/inforUser' + '?id=' + id);
  }
  createComent(value: NewsCreateCommentDTO): Observable<any> {
    console.log(this.apiURL + "/comment/create", value);
    return this.http.post<any>(this.apiURL + "/comment/create", value);
  }
}
