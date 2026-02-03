import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';


@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.css']
})
export class EmailVerificationComponent implements OnInit {

  auth: FirebaseTSAuth;

  constructor(private matSnackBar: MatSnackBar) {
    this.auth = new FirebaseTSAuth();
   }

  ngOnInit(): void {
  }

  getEmail(){
    let email = this.auth.getAuth().currentUser?.email;
    return email;
  }

  onResendClick(){
    this.auth.sendVerificaitonEmail();
    this.matSnackBar.open('Email reenviado com sucesso', 'OKAY')
  }
}
