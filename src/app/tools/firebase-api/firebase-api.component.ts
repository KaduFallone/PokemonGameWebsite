import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore'; 
import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FirebaseApiComponent {

  auth = new FirebaseTSAuth;
  firestore = new FirebaseTSFirestore;

  constructor(private snackBar: MatSnackBar){
    this.auth = new FirebaseTSAuth();
    this.firestore = new FirebaseTSFirestore();
   }

  ngOnInit(): void {
  }

  addDB(
    route: string,
    pokemonName: string,
    imageUrl: string,
    porcentCaptura: string
  ){
    let pathName = route;
    let pokeName = pokemonName;
    let imgUrl = imageUrl;
    let percentCapture = parseFloat(porcentCaptura);
    const newId = this.firestore.genDocId();

    this.firestore.create(
      {
        path: [pathName, newId],
        data: {
          name: pokeName,
          pokeId: newId,
          imgUrl: imgUrl,
          percentCapture: percentCapture,
          addAt: new Date().toISOString()
        }
      }
    )
    
  
  }

  //get(
  //  route: string,
  //  pokemonId: HTMLInputElement
  //){

  //}

  //delete(route: string){

  //}

}


