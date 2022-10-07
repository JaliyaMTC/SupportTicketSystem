import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private router: Router,) { }
  public loginValid = true;
  public username = '';
  public password = '';

  ngOnInit(): void {
  }
  loginToSystem() {
    console.log("Hi", this.username);
    this.router.navigate(['/home']);
  }
}
