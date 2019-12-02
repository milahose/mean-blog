import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { BlogService } from '../../services/blog/blog.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-new-blog',
  templateUrl: './new-blog.component.html',
  styleUrls: ['./new-blog.component.css']
})

export class NewBlogComponent implements OnInit {

  public Editor = ClassicEditor;
  user = JSON.parse(localStorage.getItem('user'));
  constructor(private fb: FormBuilder, private router: Router, private BlogService: BlogService) { }

  msg;
  msgClass;
  public blog = {
    title: '',
    body: '',
    username: this.user.username,
    name: `${this.user.firstname} ${this.user.lastname}`
  };

  ngOnInit() {}

  onTitleChange(e) {
    this.blog.title = this.titleForm.get('title').value;
  }

  submitBlog() {
    this.blog.title = this.blog.title;
    this.BlogService.addPost(this.blog)
      .subscribe(res => {
        if (res.err) {
          this.msgClass = 'alert alert-danger show';
          this.msg = res.msg;
        } else {
          this.msgClass = 'alert alert-success show';
          this.msg = res.msg;
          this.router.navigateByUrl(`/blog/${this.blog.title.toLowerCase().split(' ').join('-')}`);
        }
      })
  }

  titleForm = this.fb.group({
    title: ['', Validators.required]
  });

}
