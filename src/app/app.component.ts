import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { User, WeatherForecast } from './models/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public forecasts?: WeatherForecast[];
  public user?: User;

  constructor(http: HttpClient) {
    http.get<WeatherForecast[]>('/weatherforecast').subscribe(result => {
      this.forecasts = result;
      console.log("result : ", result);
    }, error => console.error(error));
    http.get<User>('/user/2').subscribe(e => {
      this.user = e;
      console.log("user :", e);
    }, error => console.error(error));
  }

  title = 'TicketSystem';
  userName: any;

  ngOnInit() {
  }
}
