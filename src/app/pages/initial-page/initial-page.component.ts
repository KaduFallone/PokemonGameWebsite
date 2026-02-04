import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';

@Component({
  selector: 'app-initial-page',
  templateUrl: './initial-page.component.html',
  styleUrls: ['./initial-page.component.css']
})
export class InitialPageComponent implements OnInit {
  auth = new FirebaseTSAuth;

  firestore = new FirebaseTSFirestore;

  isLogedin: boolean = false;

  userRole: string = "";

  constructor(private router: Router) {
    this.auth = new FirebaseTSAuth();
    this.firestore = new FirebaseTSFirestore(); 

  
  }
  ngOnInit(): void {
  }

  

}
