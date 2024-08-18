// import { Component, OnInit } from '@angular/core';
// import { AuthService } from '../services/aut.service';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent implements OnInit {

//   constructor(private authService: AuthService) { }

//   loginUser: any = {}

//   ngOnInit() {
//   }

//   login() {
//     this.authService.login(this.loginUser);
//   }

//   logOut(){
//     this.authService.logOut();
//   } 

//   get isAuthenticated(){
//    return this.authService.loggedIn();
//   }

// }

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService) { }

  loginUser: any = {}

  ngOnInit() {
  }

  login() {
    this.authService.login(this.loginUser);
  }

  logOut(){
    this.authService.logOut();
  } 

  get isAuthenticated(){
   return this.authService.loggedIn();
  }

}
