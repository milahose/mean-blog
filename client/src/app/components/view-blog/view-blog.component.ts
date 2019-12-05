import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog/blog.service';
import { CommentService } from '../../services/comment/comment.service';
import { LikeService } from '../../services/like/like.service';
import { ActivatedRoute, Router } from "@angular/router";
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
  editing = false;
  editingId;
  user = JSON.parse(localStorage.getItem('user'));

  constructor(
    private BlogService: BlogService, 
    private CommentService: CommentService, 
    private LikeService: LikeService,
    private route: ActivatedRoute, 
    private fb: FormBuilder,
    private router: Router) {
    this.blog = window.history.state;
  }

  ngOnInit() {
    const post = this.route.snapshot.paramMap.get('title');
    this.BlogService.getPost(post).then(res => {
      let blogBody = document.getElementById('blog-body');
      this.blog = res.blog;
      this.blog.date = new Date(res.blog.date).toString().slice(0, 15);
      blogBody.innerHTML = this.blog.body;

      this.CommentService.getBlogComments(res.blog._id)
        .then(res => this.comments = res.result);

      this.LikeService.getBlogLikes(res.blog._id)
        .then(res => {
          this.likes = res.result;
          this.likeCount = res.result.length;
        });
    });
  }

  commentForm = this.fb.group({
    comment: ['', Validators.required]
  });

  editCommentForm = this.fb.group({
    comment: ['', Validators.required]
  });

  formatDate(date) {
    return new Date(date).toString().slice(0, 15);
  }

  updateLikes() {
    const userLiked = this.likes.filter(like => like.user === this.user._id);
    if (!userLiked.length) {
      this.LikeService.addLike({ blog: this.blog._id })
        .then(res => {
          if (!res.err) {
            this.likeCount++;
            this.likes.unshift(res.result)
          }
        })
        .then(null, err => {
          this.msgClass = 'alert alert-danger alert-dismissible fade show';
          this.msg = err;
        });
    } else {
      this.LikeService.deleteLike(userLiked[0]._id)
        .then(res => {
          if (!res.err) {
            this.likeCount--;
            this.likes = this.likes.filter(like => like.user !== this.user._id);
          }
        })
        .then(null, err => {
          this.msgClass = 'alert alert-danger alert-dismissible fade show';
          this.msg = err;
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
      .then(res => {
        if (res.err) {
          this.msgClass = 'alert alert-danger alert-dismissible fade show';
          this.msg = res.msg;
        } else {
          this.comments.unshift(res.result);
          this.commentForm.reset();
        }
      })
      .then(null, err => {
        this.msgClass = 'alert alert-danger alert-dismissible fade show';
        this.msg = err;
      });
  }

  editComment(postComment) {
    this.stopEditing();
    const updatedComment = this.editCommentForm.get('comment').value;
    this.comments = this.comments.map(comment => {
      if (comment._id === postComment._id) {
        comment.comment = updatedComment;
        return comment;
      }
      return comment;
    });

    this.CommentService.updateComment({
      _id: postComment._id,
      user: this.user._id,
      blog: this.blog._id,
      comment: updatedComment
    }).then(res => {
        if (res.err) {
          this.msgClass = 'alert alert-danger alert-dismissible fade show';
          this.msg = res.msg;
        }
      })
      .then(null, err => {
        this.msgClass = 'alert alert-danger alert-dismissible fade show';
        this.msg = err;
      });
  }

  deleteComment(e, postComment) {
    e.preventDefault();
    this.stopEditing();
    this.CommentService.deleteComment(postComment._id)
      .then(res => {
        if (res.err) {
          this.msgClass = 'alert alert-danger alert-dismissible fade show';
          this.msg = res.msg;
        } else {
          this.comments = this.comments.filter(comment => {
            return comment._id !== postComment._id;
          });
        }
      })
      .then(null, err => {
        this.msgClass = 'alert alert-danger alert-dismissible fade show';
        this.msg = err;
      });
  }

  editClicked(e, comment) {
    e.preventDefault();
    this.editing = true;
    this.editingId = comment._id;
  }

  stopEditing() {
    this.editing = false;
    this.editingId = null;
  }

  deletePost(blog) {
    this.BlogService.deletePost(blog._id)
      .then(res => {
        if (res.err) {
          this.msgClass = 'alert alert-danger show';
          this.msg = res.msg;
        } else {
          this.router.navigateByUrl(`/blog`); 
        }
      })
      .then(null, err => {
        this.msgClass = 'alert alert-danger alert-dismissible fade show';
        this.msg = err;
      });
  }

}
