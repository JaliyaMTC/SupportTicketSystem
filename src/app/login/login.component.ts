import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { User } from './../models/common';
import { UserLoginResp } from './../models/common';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private router: Router,
    private http: HttpClient) { }
  public loginValid = true;
  public username = '';
  public password = '';
  public userValidate?: UserLoginResp;
  public user?: User;
  public isLogInValid: boolean = false;

  ngOnInit(): void {
  }
  loginToSystem() {
    console.log("Username: ", this.username);
    //console.log("Password: ", this.password);
    var secretKey = 'secret';
    var encodedPassword = CryptoJS.AES.encrypt(this.password.trim(), secretKey).toString();
    this.http.get<User>('https://localhost:7239/user/1').subscribe(user => {
      this.user = user;
      console.log("user :", user);
    }, error => console.error(error));
    this.http.get<UserLoginResp>('https://localhost:7239/userValidate/' + this.username + '/password/' + this.password).subscribe(res => {
      this.userValidate = res;
      if (!!this.userValidate.userId && !!this.userValidate.userLevel) {
        this.router.navigate(['/home']);
      } else {
        this.isLogInValid = true;
        this.username = '';
        this.password = '';
      }
      console.log("userValidate :", res);
    }, error => console.error(error));
  }
}
