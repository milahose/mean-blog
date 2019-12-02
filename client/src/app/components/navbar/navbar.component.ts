import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {

  constructor(public AuthService: AuthService, private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  user;
  name;

  ngOnInit() {}

  getUser() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.name = `${this.user.firstname} ${this.user.lastname}`;
    return true;
  }

}
