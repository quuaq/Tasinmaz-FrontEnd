// nav.component.ts
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

  isAdmin() {
    return this.authService.role === 'admin';
  }

  isUser() {
    return this.authService.role === 'user';
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  logOut() {
    this.authService.logOut();
  }
}
