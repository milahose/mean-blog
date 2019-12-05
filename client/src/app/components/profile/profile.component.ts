import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog/blog.service';
import { LikeService } from '../../services/like/like.service';
import { CommentService } from '../../services/comment/comment.service';
import { SharedService } from '../../services/shared/shared.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {

  constructor(
    private BlogService: BlogService, 
    private LikeService: LikeService, 
    private CommentService: CommentService, 
    private router: Router, 
    private route: ActivatedRoute,
    private ss: SharedService,
    private fb: FormBuilder) {}

  loggedInUser = JSON.parse(localStorage.getItem('user'));
  username = this.route.snapshot.paramMap.get('username');
  heading;
  user;
  allowEdits;
  createdOn;
  posts;
  likes;
  comments;
  msg;
  msgClass;
  editing = false;
  editingId;

  ngOnInit() { 
    if (window.location.href.includes('likes')) {
      this.heading = 'Likes';
    } else if (window.location.href.includes('comments')) {
      this.heading = 'Comments';
    } else {
      this.heading = 'Posts';
    }

    this.BlogService.getUserPosts(this.username)
      .then(res => {
        if (res.result.user.username === this.loggedInUser.username) {
          this.allowEdits = true;
          this.createdOn = new Date(res.result.user.createdOn).toLocaleDateString();
        } else {
          this.allowEdits = false;
        }

        this.user = res.result.user;
        this.posts = res.result.blogs;
      })
      .then(null, err => {
        this.msgClass = 'alert alert-danger show';
        this.msg = err.msg;
      });

    this.LikeService.getUserLikes(this.username)
      .then(res => {
        this.likes = res.result.reverse().map(record => {
          return {
            blog: {
              ...record.blog
            },
            user: {
              ...record.user,
            }
          }
        });

        return this.likes.reduce(async (promise, record) => {
          await promise;
          return this.LikeService.getBlogLikes(record.blog._id)
            .then(res => {
              record.blog.likes = res.result;
              record.blog.totalLikes = res.result.length;
              return res;
            });
        }, Promise.resolve());
      })
      .then(null, err => {
        this.msgClass = 'alert alert-danger show';
        this.msg = err.msg;
      });

    this.CommentService.getUserComments(this.username)
      .then(res => {
        this.comments = res.result.reverse().map(record => {
          return {
            comment: {
              _id: record._id,
              comment: record.comment,
              name: record.name,
              username: record.username,
              date: record.date
            },
            blog: record.blog
          }
        });

        return this.comments.reduce(async (promise, record) => {
          await promise;
          return this.BlogService.getPostById(record.blog)
            .then(res => {
              record.blog = res.blog;
              return res;
            });
        }, Promise.resolve());
      })
      .then(null, err => {
        this.msgClass = 'alert alert-danger show';
        this.msg = err;
      });
  }

  handleEditClick(e, post) {
    e.preventDefault();
    let blogTitle = this.ss.normalizeRoute(post.title);
    this.router.navigateByUrl(`/blog/${blogTitle}/edit`, { state: post });
  }

  handleNewBlogClick(e) {
    e.preventDefault();
    this.router.navigateByUrl(`/blog/new`);  
  }

  deletePost(post) {
    const deletedPostId = post._id;
    this.BlogService.deletePost(post._id)
      .then(res => {
        if (res.err) {
          this.msgClass = 'alert alert-danger show';
          this.msg = res.msg;
        } else {
          this.msgClass = 'alert alert-success show';
          this.msg = res.msg;
          this.posts = this.posts.map(post => {
            if (post._id !== deletedPostId) {
              return post;
            }
          });
        }
      })
      .then(null, err => {
        this.msgClass = 'alert alert-danger show';
        this.msg = err;
      })
  }

  updateLikes(post) {
    const userHasLiked = post.blog.likes.filter(record => 
      record.user === this.loggedInUser._id
    );

    if (userHasLiked.length) {
      if (this.user._id === this.loggedInUser._id) {
        this.LikeService.deleteLike(userHasLiked[0]._id)
          .then(res => {
            if (!res.err) {
              this.likes = this.likes.filter(record => 
                record.blog._id !== post.blog._id  
              );
            }
          })
          .then(null, err => {
            this.msgClass = 'alert alert-danger show';
            this.msg = err.msg;
          });
      } else {
        this.LikeService.deleteLike(userHasLiked[0]._id)
          .then(res => {
            if (!res.err) {
              post.blog.totalLikes--;
              this.likes.forEach(record => {
                if (record.blog._id === post.blog._id) {
                  record.blog.likes = record.blog.likes.filter(like => 
                    like._id !== userHasLiked[0]._id
                  );
                }
              })
            }
          })
          .then(null, err => {
            this.msgClass = 'alert alert-danger show';
            this.msg = err.msg;
          });
      }
    } else {
      this.LikeService.addLike({
        blog: post.blog._id,
        user: this.loggedInUser._id
      })
        .then(res => {
          post.blog.totalLikes++;
          this.likes.forEach(record => {
            if (record.blog._id === post.blog._id) {
              record.blog.likes.push(res.result);
            }
          })
        })
        .then(null, err => {
          this.msgClass = 'alert alert-danger show';
          this.msg = err.msg;
        });
    }
  }
  
  editCommentForm = this.fb.group({
    comment: ['', Validators.required]
  });

  editComment(postComment) {
    this.stopEditing();
    const updatedComment = this.editCommentForm.get('comment').value;
    this.comments = this.comments.map(record => {
      if (record.comment._id === postComment.comment._id) {
        record.comment.comment = updatedComment;
        return record;
      }
      return record;
    });

    this.CommentService.updateComment({
      _id: postComment.comment._id,
      user: this.user._id,
      blog: postComment.blog._id,
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
          this.comments = this.comments.filter(record => {
            return record.comment._id !== postComment._id;
          });
        }
      })
      .then(null, err => {
        this.msgClass = 'alert alert-danger alert-dismissible fade show';
        this.msg = err;
      });
  }

  editClicked(e, record) {
    e.preventDefault();
    this.editing = true;
    this.editingId = record.comment._id;
  }

  stopEditing() {
    this.editing = false;
    this.editingId = null;
  }

}
