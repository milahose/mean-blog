import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { BlogService } from '../../services/blog/blog.service';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.css']
})

export class EditBlogComponent implements OnInit {

  public Editor = ClassicEditor;
  public blog = {
    title: '',
    body: ''
  };

  constructor(private fb: FormBuilder, private BlogService: BlogService, private route: ActivatedRoute, private router: Router) {
    this.blog = window.history.state;
  }

  ngOnInit() {
    const post = this.route.snapshot.paramMap.get('title');
    this.BlogService.getPost(post).subscribe(res => this.blog = res.blog);
  }

  onTitleChange(e) {
    this.blog.title = this.titleForm.get('title').value;
  }

  submitBlogEdits() {
    this.blog.title = this.blog.title;
    this.BlogService.editPost(this.blog)
      .subscribe(res => {
        this.router.navigateByUrl(`/blog/${this.blog.title.toLowerCase().split(' ').join('-')}`);
      })
  }

  titleForm = this.fb.group({
    title: ['', Validators.required]
  });

}

