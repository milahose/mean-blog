import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.css']
})

export class EditBlogComponent implements OnInit {

  private ckeditorContent: string;
  constructor() {
    console.log(window.history.state.body)
    this.ckeditorContent = window.history.state.body;
  }

  blog;

  ngOnInit() {
    this.blog = window.history.state;
  }

  onReady() {
    console.log('ready')
  }

  onFocus() {
    console.log('focus')
  }

  onChange() {
    console.log(`this.ckeditorContent`, this.ckeditorContent)
  }

  onBlur() {
    console.log('blur')
  }

}
