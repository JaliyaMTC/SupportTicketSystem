import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  displayedColumns = ['ticketId', 'title', 'description', 'action'];
  dataSource = new MatTableDataSource<Element[]>;
  ticketsList: any[] = [{
    'ticketId': '#28932',
    'title': 'Admin Rights',
    'description': 'I\'m a new comer, please fix admin rights',
    'action': ''
  }];
  constructor() { }

  ngOnInit(): void {
  }
}
