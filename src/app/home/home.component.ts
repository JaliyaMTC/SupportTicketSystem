import { Component, OnInit, Inject, AfterViewInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreateTicketComponent } from './../create-ticket/create-ticket.component';
import { NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { AssigneeSelectionComponent } from '../assignee-selection/assignee-selection.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild('paginatorPageSize') paginatorPageSize!: MatPaginator;

  displayedColumns = ['ticketId', 'title', 'description', 'action'];
  dataSource = new MatTableDataSource<Element[]>;
  ticketsList: any[] = [];
  selectedTabIndex = 0;
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  pageEvent: PageEvent = new PageEvent;

  title = "";
  description = "";
  userId: any;
  userLevel: any;
  status = 'Open';
  isButtonClick = false;

  constructor(public dialog: MatDialog,
    private http: HttpClient,
    private router: Router,) { }

  ngAfterViewInit() {
    setTimeout(() => {
      this.userId = sessionStorage.getItem("userId");
      this.userLevel = sessionStorage.getItem("userLevel");
      console.log("yyuyu:" + this.userId)
      if (this.userId == null || this.userLevel == null) {
        this.router.navigate(['']);
      } else {
        this.loadTableData();
      }
    });
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  loadTableData() {
    var createdBy;
    if (this.userLevel == 'CUSTOMER') {
      createdBy = this.userId;
    } else {
      createdBy = null;
    }
    this.http.get<any>('https://localhost:7239/ticketBy/' + createdBy + '/status/' + this.status).subscribe(res => {
      this.ticketsList = res;
      this.dataSource.data = this.ticketsList;
      this.dataSource.paginator = this.paginator;

      console.log("ticket list :", res);
    }, error => console.error(error));
  }

  onTabChanged($event: any) {
    console.log('event ' + $event.index);
    this.selectedTabIndex = $event.index;
    if (this.selectedTabIndex == 0) {
      this.status = 'Open';
    } else if (this.selectedTabIndex == 1) {
      this.status = 'InProgress';
    } else if (this.selectedTabIndex == 2) {
      this.status = 'Closed';
    } else if (this.selectedTabIndex == 3) {
      this.status = 'ReOpen';
    }
    this.loadTableData();
  }

  openCreateTicket(): void {
    this.userId = sessionStorage.getItem("userId");
    this.userLevel = sessionStorage.getItem("userLevel");
    const dialogRef = this.dialog.open(CreateTicketComponent, {
      width: '450px',
      data: { title: this.title, description: this.description, userId: this.userId },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed' + result);
      this.title = result;
      this.loadTableData();
    });
  }

  changeStatus(ticketId: any, status: any) {
    this.isButtonClick = true;
    this.http.post<any>('https://localhost:7239/update-ticket', {
      "userId": this.userId,
      "ticketId": ticketId,
      "status": status
    }).subscribe(r => {
      this.isButtonClick = false;
      this.loadTableData();
      console.log("successfully updated the ticket");
    }, error => { console.error(error); this.isButtonClick = false; });
  }

  logoutFromSystem() {
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('userLevel');
    sessionStorage.clear();
    this.router.navigate(['']);
  }

  addAssigneeToTicket(ticketId: any) {
    const dialogRef = this.dialog.open(AssigneeSelectionComponent, {
      width: '450px',
      data: { ticketId: ticketId, userId: this.userId },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed' + result);
      this.title = result;
      this.loadTableData();
    });
  }
}
