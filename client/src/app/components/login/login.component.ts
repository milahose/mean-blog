import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../services/Api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  constructor(private fb: FormBuilder, private ApiService: ApiService, private router: Router) { }

  msg: string;
  msgClass: string;
  button;


  handleSubmit() {
    this.ApiService.login({
      usernameOrEmail: this.loginForm.get('usernameOrEmail').value,
      password: this.loginForm.get('password').value
    })
      .subscribe(result => {
        if (result.err) {
          this.msgClass = 'alert alert-danger alert-dismissible fade show';
          this.msg = result.msg;
        } else {
          this.msgClass = 'alert alert-success alert-dismissible fade show';
          this.msg = result.msg;
          setTimeout(() => this.router.navigate(['/login']), 2000);
        }
      })
  }

  loginForm = this.fb.group({
    usernameOrEmail: ['', Validators.required],
    password: ['', Validators.required]
  });

}
