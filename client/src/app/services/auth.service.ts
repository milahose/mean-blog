import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';


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

  storeAuthToken(token, user) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', user); 
    this.authToken = token;
    this.user = user;
  }

}