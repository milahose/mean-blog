import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog/blog.service';
import { Router } from '@angular/router';

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

  ngOnInit() {
    this.BlogService.getUserPosts(this.user.username)
      .subscribe(res => this.posts = res.result.blogs);
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

}
