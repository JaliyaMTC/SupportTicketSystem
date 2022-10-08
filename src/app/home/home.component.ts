import { Component, OnInit, Inject, ViewEncapsulation, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreateTicketComponent } from './../create-ticket/create-ticket.component';
import { NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;

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
  userId = 2;
  status = 'Open';

  constructor(public dialog: MatDialog,
    private http: HttpClient) { }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.loadTableData();
  }

  loadTableData() {
    this.http.get<any>('https://localhost:7239/ticketBy/' + this.userId + '/status/' + this.status).subscribe(res => {
      this.ticketsList = res;

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
      this.status = 'Reopen';
    }
    this.loadTableData();
  }

  openCreateTicket(): void {
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
}
