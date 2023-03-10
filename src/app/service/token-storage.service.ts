import { Injectable } from '@angular/core';
import {JwtHelperService} from "@auth0/angular-jwt";

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor(private jwtHelper: JwtHelperService) { }

  public logOut(){
    window.localStorage.clear();
    window.sessionStorage.clear();
  }

  public saveTokenLocal(token: string){
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
  }
  public saveUserLocal(user: any){
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public saveTokenSession(token: string){
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }
  public saveUserSession(user: any) {
    sessionStorage.removeItem(USER_KEY);
    sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getToken(): string{
    if(window.localStorage.getItem(TOKEN_KEY)!==null){
      return window.localStorage.getItem(TOKEN_KEY);
    }else {
      return window.sessionStorage.getItem(TOKEN_KEY);
    }
  }



  public getUser(): any {
    if (window.sessionStorage.getItem(USER_KEY) !== null) {
      return JSON.parse(window.sessionStorage.getItem(USER_KEY));
    } else {
      return JSON.parse(window.localStorage.getItem(USER_KEY));
    }
  }

  // this function is used to check all token that access to the app
  public isAuthenticated(): boolean {
    // const token = this.getUser().token;
    const token = this.getToken();
    if (token == null){
      return false
    }
    return !this.jwtHelper.isTokenExpired(token);
  }
}
