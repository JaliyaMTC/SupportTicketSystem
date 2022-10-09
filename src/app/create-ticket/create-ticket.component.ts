import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreateTicketData } from '../models/common';

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
  userId: any;

  constructor(public dialogRef: MatDialogRef<CreateTicketComponent>,
    private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: CreateTicketData) { }

  ngOnInit(): void {
    this.userId = this.data.userId;
  }

  createTicket() {
    console.log(this.description)
    console.log("userId : ", this.userId);
    this.http.post<any>('https://localhost:7239/create-ticket', {
      "title": this.title,
      "description": this.description,
      "userId": this.userId
    }).subscribe(r => {
      console.log("successfully created ticket");
    }, error => console.error(error));

    this.dialogRef.close();
  }
}
