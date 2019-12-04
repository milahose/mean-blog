import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog/blog.service';
import { SharedService } from '../../services/shared/shared.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  posts;

  constructor(private BlogService: BlogService, private ss: SharedService) { }

  ngOnInit() {
    this.BlogService.getAllPosts()
      .then(res => this.posts = res.blog);
  }

}
