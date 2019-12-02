import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog/blog.service';
import { CommentService } from '../../services/comment/comment.service';
import { LikeService } from '../../services/like/like.service';
import { ActivatedRoute } from "@angular/router";
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-view-blog',
  templateUrl: './view-blog.component.html',
  styleUrls: ['./view-blog.component.css']
})

export class ViewBlogComponent implements OnInit {

  blog;
  comments;
  msg;
  msgClass;

  constructor(
    private BlogService: BlogService, 
    private CommentService: CommentService, 
    private route: ActivatedRoute, 
    private fb: FormBuilder) {
    this.blog = window.history.state;
  }

  ngOnInit() {
    const post = this.route.snapshot.paramMap.get('title');
    this.BlogService.getPost(post).subscribe(res => {
      let blogBody = document.getElementById('blog-body');
      this.blog = res.blog;
      this.blog.date = new Date(res.blog.date).toString().slice(0, 15);
      blogBody.innerHTML = this.blog.body;

      this.CommentService.getBlogComments(res.blog._id)
        .subscribe(res => this.comments = res.result);
    });
  }

  commentForm = this.fb.group({
    comment: ['', Validators.required]
  });

  formatDate(date) {
    return new Date(date).toString().slice(0, 15);
  }

  submitComment() {
    const comment = this.commentForm.get('comment').value;
    const user = JSON.parse(localStorage.getItem('user'));

    this.CommentService.addComment({
      user: user._id,
      blog: this.blog._id,
      comment: comment,
      name: `${user.firstname} ${user.lastname}`,
      username: user.username
    })
      .subscribe(res => {
        if (res.err) {
          this.msgClass = 'alert alert-danger alert-dismissible fade show';
          this.msg = res.msg;
        } else {
          this.comments.unshift(res.result);
          this.commentForm.reset();
        }
      });
  }

}
