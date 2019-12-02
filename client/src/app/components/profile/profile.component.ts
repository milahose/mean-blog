import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog/blog.service';
import { AuthService } from '../../services/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Options } from 'selenium-webdriver/chrome';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {

  constructor(private BlogService: BlogService, private AuthService: AuthService, private router: Router, private route: ActivatedRoute) { }

  loggedInUser = JSON.parse(localStorage.getItem('user'));
  user;
  allowEdits;
  createdOn;
  posts;
  msg;
  msgClass;

  ngOnInit() {
    this.BlogService.getUserPosts(this.route.snapshot.paramMap.get('username'))
      .subscribe(res => {
        if (res.result.user.username === this.loggedInUser.username) {
          this.allowEdits = true;
          this.createdOn = new Date(res.result.user.createdOn).toLocaleDateString();
        } else {
          this.allowEdits = false;  
        }

        this.user = res.result.user;
        this.posts = res.result.blogs;
      });
  }

  parseHTML(post, i) {
    let elm = document.querySelector(`.post-body-${i}`);
    elm.innerHTML = post.body;
  }

  formatDate(date) {
    return new Date(date).toString().slice(0, 15);
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
