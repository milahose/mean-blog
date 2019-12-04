import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LikeService {

  constructor(private http: HttpClient) { }

  headers = {
    'Content-Type': 'application/json',
    'authorization': localStorage.getItem('token')
  }

  addLike(like) {
    return this.http.post<any>(`api/like/`, like, { headers: this.headers }).toPromise();
  }

  getUserLikes(username) {
    return this.http.get<any>(`api/like/username/${username}`, { headers: this.headers, params: username }).toPromise();
  }

  getBlogLikes(blog) {
    return this.http.get<any>(`api/like/blog/${blog}`, { headers: this.headers, params: blog }).toPromise();
  }

  deleteLike(id) {
    return this.http.delete<any>(`api/like/${id}`, { headers: this.headers }).toPromise();
  }

}

