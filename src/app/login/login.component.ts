import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { User } from './../models/common';

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
  public userValidate?: User;
  public user?: User;

  ngOnInit(): void {
  }
  loginToSystem() {
    console.log("Username: ", this.username);
    console.log("Password: ", this.password);
    this.http.get<User>('/user/2').subscribe(user => {
      this.user = user;
      console.log("user :", user);
    }, error => console.error(error));
    this.http.get<User>('/userValidate/ChanakaJaliya').subscribe(res => {
      this.userValidate = res;
      console.log("userValidate :", res);
    }, error => console.error(error));
    this.router.navigate(['/home']);
  }
}
