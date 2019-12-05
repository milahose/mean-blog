import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { BlogService } from '../../services/blog/blog.service';
import { SharedService } from '../../services/shared/shared.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-new-blog',
  templateUrl: './new-blog.component.html',
  styleUrls: ['./new-blog.component.css']
})

export class NewBlogComponent implements OnInit {

  public Editor = ClassicEditor;
  user = JSON.parse(localStorage.getItem('user'));
  constructor(private fb: FormBuilder, private router: Router, private BlogService: BlogService, private ss: SharedService) { }

  msg;
  msgClass;
  public blog = {
    title: '',
    body: '',
    username: this.user.username,
    name: `${this.user.firstname} ${this.user.lastname}`,
    img: '',
    imgAlt: ''
  };

  ngOnInit() {}

  onTitleChange(e) {
    this.blog.title = this.titleForm.get('title').value;
  }

  submitBlog() {
    this.blog.title = this.blog.title.trim().split('').map(word => {
      // Strip special characters out of title to normalize URL
      return word.split('').map(char => {
        if (char !== ':') {
          if (char == '-') {
            return ' to '
          } else {
            return char;
          }
        }
      })
    }).join('')
    // Generate a random image for the blog
    let img = this.ss.generateImg();
    this.blog.img = img.img;
    this.blog.imgAlt = img.alt;
    this.BlogService.addPost(this.blog)
      .then(res => {
        if (res.err) {
          this.msgClass = 'alert alert-danger show';
          this.msg = res.msg;
        } else {
          this.msgClass = 'alert alert-success show';
          this.msg = res.msg;
          this.router.navigateByUrl(`/blog/${this.ss.normalizeRoute(this.blog.title)}`);
        }
      })
      .then(null, err => {
        this.msgClass = 'alert alert-danger show';
        this.msg = err;
      })
  }

  titleForm = this.fb.group({
    title: ['', Validators.required]
  });

}
