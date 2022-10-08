import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface CrateTicketData {
  title: string;
  description: string;
  userId: string;
}

@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.scss']
})
export class CreateTicketComponent implements OnInit {
  public formValid = true;
  title = '';
  description = '';
  userId = '';

  constructor(public dialogRef: MatDialogRef<CreateTicketComponent>,
    private http: HttpClient) { }

  ngOnInit(): void {
  }

  createTicket() {
    console.log(this.description)
    this.http.post<any>('/create-ticket', {
      "title": this.title,
      "description": this.description,
      "userId": this.userId
    }).subscribe(r => {
      console.log("successfully created ticket");
    }, error => console.error(error));

    this.dialogRef.close();
  }
}
