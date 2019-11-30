import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from "@auth0/angular-jwt";
const jwt = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient) { }

  authToken;
  user;

  headers = {
    'Content-Type': 'application/json',
    'authorization': localStorage.getItem('token')
  }

  register(user): Observable<any> {
    return this.http.post<any>('api/auth/register', user);
  }

  login(user): Observable<any> {
    return this.http.post<any>('api/auth/login', user);
  }

  logout() {
    localStorage.clear();
    this.authToken = null;
    this.user = null;
  }

  storeAuthToken(token, user) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', user); 
    this.authToken = token;
    this.user = user;
  }

  tokenExpired() {
    if (!this.authToken) {
      return true;
    } else {
      return jwt.isTokenExpired(this.authToken);
    }
  }

}