import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  constructor(private fb: FormBuilder, private AuthService: AuthService, private router: Router) { }

  msg: string;
  msgClass: string;
  button;


  handleSubmit() {
    this.AuthService.login({
      usernameOrEmail: this.loginForm.get('usernameOrEmail').value.toLowerCase(),
      password: this.loginForm.get('password').value
    })
      .subscribe(res => {
        if (res.err) {
          this.msgClass = 'alert alert-danger alert-dismissible fade show';
          this.msg = res.msg;
        } else {
          this.AuthService.storeAuthToken(res.token, JSON.stringify(res.user));
          this.msgClass = 'alert alert-success alert-dismissible fade show';
          this.msg = res.msg;
          setTimeout(() => this.router.navigate(['/blog']), 500);
        }
      })
  }

  loginForm = this.fb.group({
    usernameOrEmail: ['', Validators.required],
    password: ['', Validators.required]
  });

}
