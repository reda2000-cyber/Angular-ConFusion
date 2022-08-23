import { Component, OnInit } from '@angular/core';
import{MatDialog,MatDialogRef} from "@angular/material";
import {flyInOut} from "../animations/app-animation";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  host : {
    '[@flyInOut]':'true',
    'style':'display : block;'

  },
  animations :[
    flyInOut()
  ]
})
export class LoginComponent implements OnInit {
  user = {username: '', password: '', remember: false};

  constructor(public dialogRef: MatDialogRef<LoginComponent>) { }

  ngOnInit() {
  }

  onSubmit() {
    console.log('User: ', this.user);
    this.dialogRef.close();
  }

}
