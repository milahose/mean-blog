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
  likes;
  msg;
  msgClass;
  likeCount = 0;
  user = JSON.parse(localStorage.getItem('user'));

  constructor(
    private BlogService: BlogService, 
    private CommentService: CommentService, 
    private LikeService: LikeService,
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

      this.LikeService.getBlogLikes(res.blog._id)
        .subscribe(res => {
          this.likes = res.result;
          this.likeCount = res.result.length;
        });
    });
  }

  commentForm = this.fb.group({
    comment: ['', Validators.required]
  });

  formatDate(date) {
    return new Date(date).toString().slice(0, 15);
  }

  updateLikes() {
    const userLiked = this.likes.filter(like => like.user === this.user._id);
    console.log('userLiked', userLiked)
    if (!userLiked.length) {
      this.LikeService.addLike({ blog: this.blog._id })
        .subscribe(res => {
          if (!res.err) {
            this.likeCount++;
            this.likes.unshift(res.result)
          }
        });
    } else {
      this.LikeService.deleteLike(userLiked[0]._id)
        .subscribe(res => {
          if (!res.err) {
            this.likeCount--;
            this.likes = this.likes.filter(like => like.user !== this.user._id);
          }
        });
    }
  }

  submitComment() {
    const comment = this.commentForm.get('comment').value;
    this.CommentService.addComment({
      user: this.user._id,
      blog: this.blog._id,
      comment: comment,
      name: `${this.user.firstname} ${this.user.lastname}`,
      username: this.user.username
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
