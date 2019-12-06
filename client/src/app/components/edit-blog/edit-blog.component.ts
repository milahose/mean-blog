import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { BlogService } from '../../services/blog/blog.service';
import { SharedService } from '../../services/shared/shared.service';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.css']
})

export class EditBlogComponent implements OnInit {

  msg;
  msgClass;
  public Editor = ClassicEditor;
  public blog = {
    title: '',
    body: '',
    originalTitle: ''
  };

  constructor(
    private fb: FormBuilder, 
    private BlogService: BlogService, 
    public ss: SharedService, 
    private route: ActivatedRoute, 
    private router: Router) {
    this.blog = window.history.state;
  }

  ngOnInit() {
    const post = this.route.snapshot.paramMap.get('title');
    this.BlogService.getPost(post).then(res => {
      this.blog = res.blog;
      this.blog.originalTitle = res.blog.title;
    })
  }

  onTitleChange(e) {
    this.blog.title = this.titleForm.get('title').value;
  }

  submitBlogEdits() {
    this.blog.title = this.blog.title;
    this.BlogService.editPost(this.blog)
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
  }

  titleForm = this.fb.group({
    title: ['', Validators.required]
  });

}

