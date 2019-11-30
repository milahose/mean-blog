import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {

  constructor(public AuthService: AuthService) { }

  user;
  name;

  ngOnInit() {}

  getUser() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.name = `${this.user.firstname} ${this.user.lastname}`;
    return true;
  }

}
