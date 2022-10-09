import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface AssigneeData {
  ticketId: string;
  userId: string;
}

@Component({
  selector: 'app-assignee-selection',
  templateUrl: './assignee-selection.component.html',
  styleUrls: ['./assignee-selection.component.scss']
})
export class AssigneeSelectionComponent implements OnInit {
  assignee: any;
  ticketId: any;
  userId: any;
  assigneeList: any = [];
  constructor(private http: HttpClient,
    public dialogRef: MatDialogRef<AssigneeSelectionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AssigneeData) { }

  ngOnInit(): void {
    this.ticketId = this.data.ticketId;
    this.userId = this.data.userId;
    this.loadSupportTeamMembers();
  }

  loadSupportTeamMembers() {
    this.http.get<any>('https://localhost:7239/support-users').subscribe(res => {
      this.assigneeList = res;
      console.log("assignee list :", res);
    }, error => console.error(error));
  }

  assignToTicket() {
    console.log('assignee: ' + this.assignee);
    this.http.post<any>('https://localhost:7239/assign-user-ticket/ticket/' + this.ticketId +
      '/userId/' + this.userId + '/assignee/' + this.assignee, {}).subscribe(r => {
        console.log("successfully created ticket");
      }, error => console.error(error));
    this.dialogRef.close();
  }
}
