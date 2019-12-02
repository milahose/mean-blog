import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CommentService {

  constructor(private http: HttpClient) { }

  headers = {
    'Content-Type': 'application/json',
    'authorization': localStorage.getItem('token')
  }

  addComment(comment): Observable<any> {
    return this.http.post<any>(`api/comment/`, comment, { headers: this.headers });
  }

  getUserComments(username): Observable<any> {
    return this.http.get<any>(`api/comment/username/${username}`, { headers: this.headers, params: username });
  }

  getBlogComments(blog): Observable<any> {
    return this.http.get<any>(`api/comment/blog/${blog}`, { headers: this.headers, params: blog });
  }

  updateComment(comment): Observable<any> {
    return this.http.put<any>(`api/comment`, comment, { headers: this.headers });
  }

  deleteComment(id): Observable<any> {
    return this.http.delete<any>(`api/comment/${id}`, { headers: this.headers });
  }

}

