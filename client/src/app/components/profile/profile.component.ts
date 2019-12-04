import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog/blog.service';
import { LikeService } from '../../services/like/like.service';
import { CommentService } from '../../services/comment/comment.service';
import { SharedService } from '../../services/shared/shared.service';
import { ActivatedRoute, Router } from '@angular/router';
import { mergeMap } from 'rxjs/operators';

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
    private ss: SharedService) {}

  loggedInUser = JSON.parse(localStorage.getItem('user'));
  username = this.route.snapshot.paramMap.get('username');
  heading;
  user;
  allowEdits;
  createdOn;
  posts;
  likes;
  msg;
  msgClass;

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
          setTimeout(() => location.reload(), 500);
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

}
