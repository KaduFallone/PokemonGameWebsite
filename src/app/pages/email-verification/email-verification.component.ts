import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { Route, Router } from '@angular/router';


@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.css']
})
export class EmailVerificationComponent implements OnInit {

  auth: FirebaseTSAuth;

  constructor(
    private matSnackBar: MatSnackBar,
    private router: Router
  ) {
    this.auth = new FirebaseTSAuth();

    this.auth.getAuth().onAuthStateChanged( user => {
      if(user){
        this.getEmail();
      }
      else{
        this.router.navigate(['/login']);
      }
    })
   }

  ngOnInit(): void {
  }

  getEmail(){
    let email = this.auth.getAuth().currentUser?.email;
    return email;
  }

  onResendClick(){
    this.auth.sendVerificationEmail();
    this.matSnackBar.open('Email reenviado com sucesso', 'OKAY')
  }
}
