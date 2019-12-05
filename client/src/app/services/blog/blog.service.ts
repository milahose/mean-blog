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
  
  getAllPosts() {
    return this.http.get<any>(`api/blog/`, { headers: this.headers }).toPromise();
  }

  getUserPosts(username) {
    return this.http.get<any>(`api/user/@${username}/posts`, { headers: this.headers }).toPromise();
  }

  addPost(post) {
    return this.http.post<any>(`api/blog`, post, { headers: this.headers }).toPromise();
  }

  getPost(title) {
    return this.http.get<any>(`api/blog/${title}`, { headers: this.headers }).toPromise();
  }

  getPostById(id) {
    return this.http.get<any>(`api/blog/id/${id}`, { headers: this.headers }).toPromise();
  }

  editPost(post) {
    return this.http.post<any>(`api/blog/edit`, post, { headers: this.headers }).toPromise();
  }

  deletePost(id) {
    return this.http.delete<any>(`api/blog/delete/${id}`, { headers: this.headers }).toPromise();
  }
}
