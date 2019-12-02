import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog/blog.service';
import { CommentService } from '../../services/comment/comment.service';
import { LikeService } from '../../services/like/like.service';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-view-blog',
  templateUrl: './view-blog.component.html',
  styleUrls: ['./view-blog.component.css']
})

export class ViewBlogComponent implements OnInit {

  blog;

  constructor(private BlogService: BlogService, private route: ActivatedRoute) {
    this.blog = window.history.state;
  }

  ngOnInit() {
    const post = this.route.snapshot.paramMap.get('title');
    this.BlogService.getPost(post).subscribe(res => {
      let blogBody = document.getElementById('blog-body');
      this.blog = res.blog;
      this.blog.date = new Date(res.blog.date).toString().slice(0, 15);
      blogBody.innerHTML = this.blog.body;
    });
  }

}
