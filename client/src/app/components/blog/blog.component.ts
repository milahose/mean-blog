import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog/blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  posts;

  constructor(private BlogService: BlogService) { }

  ngOnInit() {
    this.BlogService.getAllPosts()
      .subscribe(res => this.posts = res.blog);
  }

  parseHTML(post, i) {
    let elm = document.querySelector(`.post-body-${i}`);
    elm.innerHTML = `${post.body.slice(0, (post.body.length > 300 ? 300 : post.body.length - 4))}...`;
  }

  formatDate(date) {
    return new Date(date).toString().slice(0, 15);
  }

}
