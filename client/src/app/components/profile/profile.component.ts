import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog/blog.service';
import { Router } from '@angular/router';
import { ResourceLoader } from '@angular/compiler';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {

  constructor(private BlogService: BlogService, private router: Router) { }

  user = JSON.parse(localStorage.getItem('user'));
  name = `${this.user.firstname} ${this.user.lastname}`
  createdOn = new Date(this.user.createdOn).toLocaleDateString();
  posts;
  msg;
  msgClass;

  ngOnInit() {
    this.BlogService.getUserPosts(this.user.username)
      .subscribe(res => this.posts = res.result.blogs);
      // .subscribe(res => console.log('post', res.result.blogs))

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

  postDeletedAcknowledegment() {
    this.posts = this.updatedPosts;
  }

}
