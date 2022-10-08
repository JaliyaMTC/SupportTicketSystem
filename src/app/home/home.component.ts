import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreateTicketComponent } from './../create-ticket/create-ticket.component';
import { NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  displayedColumns = ['ticketId', 'title', 'description', 'action'];
  dataSource = new MatTableDataSource<Element[]>;
  ticketsList: any[] = [];
  selectedTabIndex = 0;
  //  = [{
  //  'ticketId': '#28932',
  //  'title': 'Admin Rights',
  //  'description': 'I\'m a new comer, please fix admin rights',
  //  'action': ''
  //}];
  title = "";
  description = "";
  userId = 2;
  status = 'Open';

  constructor(public dialog: MatDialog,
    private http: HttpClient) { }

  ngOnInit(): void {
    this.loadTableData();
  }

  loadTableData() {
    this.http.get<any>('/ticketBy/' + this.userId + '/status/' + this.status).subscribe(res => {
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
    });
  }
}

//export class AppHome {
//  title: string | undefined;
//  description: string | undefined;

//  constructor(public dialog: MatDialog) { }

//@Component({
//  selector: 'app-create-ticket',
//  templateUrl: './create-ticket.component.html',
//})

//export class OpenCreateTicketDialog {
//  constructor(
//    public dialogRef: MatDialogRef<OpenCreateTicketDialog>,
//    @Inject(MAT_DIALOG_DATA) public data: CreateTicketData,
//  ) { }

//  onNoClick(): void {
//    this.dialogRef.close();
//  }
//}
