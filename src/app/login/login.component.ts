import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { User } from './../models/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private router: Router,
    private http: HttpClient) { }
  public loginValid = true;
  public username = '';
  public password = '';
  public userValidate?: User;

  ngOnInit(): void {
  }
  loginToSystem() {
    console.log("Username: ", this.username);
    console.log("Password: ", this.password);
    this.http.get<User>('/userValidate/ChanakaJaliya').subscribe(e => {
      this.userValidate = e;
      console.log("userValidate :", e);
    }, error => console.error(error));
    this.router.navigate(['/home']);
  }
}
