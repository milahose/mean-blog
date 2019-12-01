import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { BlogService } from '../../services/blog/blog.service';
import { ActivatedRoute } from "@angular/router";

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

  constructor(private fb: FormBuilder, private BlogService: BlogService, private route: ActivatedRoute) {
    this.blog = window.history.state;
  }

  ngOnInit() {
    const post = this.route.snapshot.paramMap.get('title').split('-').join(' ');
    this.BlogService.getPost(post).subscribe(res => this.blog = res.blog);
  }

  onTitleChange(e) {
    this.blog.title = this.titleForm.get('title').value;
  }

  onBodyChange(e) {
    console.log('change', this.blog.body)
  }

  onSubmit() {
    this.blog.title = `<h1>${this.blog.title}</h1>`;
  }

  titleForm = this.fb.group({
    title: ['', Validators.required]
  });

}

