import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-new-blog',
  templateUrl: './new-blog.component.html',
  styleUrls: ['./new-blog.component.css']
})

export class NewBlogComponent implements OnInit {

  public Editor = ClassicEditor;
  constructor(private fb: FormBuilder) { }

  public blog = {
    title: '',
    body: ''
  };

  ngOnInit() {}

  onTitleChange(e) {
    this.blog.title = this.titleForm.get('title').value;
    console.log(this.blog.title)
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
