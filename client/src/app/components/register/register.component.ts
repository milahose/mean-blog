import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {
  constructor(private fb: FormBuilder, private AuthService: AuthService, private router: Router) { }

  msg: string;
  msgClass: string;
  button;


  handleSubmit() {
    this.AuthService.register({
      firstname: this.registerForm.get('firstname').value,
      lastname: this.registerForm.get('lastname').value,
      username: this.registerForm.get('username').value.toLowerCase(),
      email: this.registerForm.get('email').value.toLowerCase(),
      password: this.registerForm.get('password').value
    })
      .then(res => {
        if (res.err) {
          this.msgClass = 'alert alert-danger alert-dismissible fade show';
          this.msg = res.msg;
        } else {
          this.msgClass = 'alert alert-success alert-dismissible fade show';
          this.msg = res.msg;
          setTimeout(() => this.router.navigate(['/blog']), 2000);
        }
      })
      .then(null, err => {
        this.msgClass = 'alert alert-danger alert-dismissible fade show';
        this.msg = err;
      })
  }

  registerForm = this.fb.group({
    firstname: ['', Validators.required],
    lastname: ['', Validators.required],
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  });
}
