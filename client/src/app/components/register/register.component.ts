import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  // registerForm = this.fb.group({
  //   firstname: [''],
  //   lastname: [''],
  //   username: [''],
  //   email: [''],
  //   password: ['']
  // })

  // constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }

}
