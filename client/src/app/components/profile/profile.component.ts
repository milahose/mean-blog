import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog/blog.service';
import { LikeService } from '../../services/like/like.service';
import { CommentService } from '../../services/comment/comment.service';
import { SharedService } from '../../services/shared/shared.service';
import { ActivatedRoute, Router } from '@angular/router';

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
    private SharedService: SharedService) {}

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
      .subscribe(res => {
        if (res.result.user.username === this.loggedInUser.username) {
          this.allowEdits = true;
          this.createdOn = new Date(res.result.user.createdOn).toLocaleDateString();
        } else {
          this.allowEdits = false;
        }

        this.user = res.result.user;
        this.posts = res.result.blogs;

        console.log('posts', this.posts)
      });

    this.LikeService.getUserLikes(this.username)
      .subscribe(res => {
        let userLikes = res.result;
        userLikes.forEach(like => {
          this.LikeService.getBlogLikes(like.blog._id)
            .subscribe(res => like.blog.totalLikes = res.result.length)
        });
        this.likes = userLikes;
      });
  }

  handleEditClick(e, post) {
    e.preventDefault();
    let blogTitle = post.title.toLowerCase().split(' ').join('-');
    this.router.navigateByUrl(`/blog/${blogTitle}/edit`, { state: post });
  }

  handleNewBlogClick(e) {
    e.preventDefault();
    this.router.navigateByUrl(`/blog/new`);  
  }

  deletePost(post) {
    const deletedPostId = post._id;
    this.BlogService.deletePost(post._id)
      .subscribe(res => {
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
  }

}
