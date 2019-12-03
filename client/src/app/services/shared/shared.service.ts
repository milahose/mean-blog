import { Injectable } from '@angular/core';
import { LikeService } from '../like/like.service';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  parseHTML(post, className, i) {
    let elm = document.querySelector(`.${className}-${i}`);
    elm.innerHTML = `${post.body.slice(0, (post.body.length > 300 ? 300 : post.body.length - 4))}...`;
  }

  formatDate(date) {
    return new Date(date).toString().slice(0, 15);
  }

}
