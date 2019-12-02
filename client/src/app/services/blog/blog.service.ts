import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class BlogService {

  constructor(private http: HttpClient) { }

  headers = {
    'Content-Type': 'application/json',
    'authorization': localStorage.getItem('token')
  }

  getUserPosts(username): Observable<any> {
    return this.http.get<any>(`api/user/@${username}/posts`, { headers: this.headers });
  }

  addPost(post): Observable<any> {
    return this.http.post<any>(`api/blog`, post, { headers: this.headers });
  }

  getPost(title): Observable<any> {
    return this.http.get<any>(`api/blog/${title}`, { headers: this.headers });
  }

  editPost(post): Observable<any> {
    return this.http.post<any>(`api/blog/edit`, post, { headers: this.headers });
  }

  deletePost(id): Observable<any> {
    return this.http.delete<any>(`api/blog/delete/${id}`, { headers: this.headers });
  }
}
