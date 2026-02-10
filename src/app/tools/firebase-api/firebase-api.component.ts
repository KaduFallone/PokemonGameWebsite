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

  get(
    route: string[],
    onSucess: (document: any[]) => void
  ){
    this.firestore.getCollection(
      {
        path: route,
        where:[],
        onComplete: (result) => {
          const dataList = result.docs.map(doc => {
            const data = doc.data();
            return { docId: doc.id, ...data };
          });
          onSucess(dataList);
        },
        onFail: (err) => {
          console.log("GET function falhou");
          console.log(err);
        }
      }
    );
  }

  delete(path: string[], onComplete: () => void ){
    this.firestore.delete({
      path: path,
      onComplete:() => {
        this.snackBar.open("Arquivo deletado do DB...", "OKAY0", {duration: 3000});

        onComplete();
      },
      onFail: (err) => {
        console.log("Erro ao deletar dado no DB...");
        this.snackBar.open("O pokemon se recusa a abandonar sua jornada...", "OKAY", {duration: 3000});
      }
    });
  }

  upDateDb(path: string[], data: any, onComplete: () => void){
      this.firestore.update(
        {
          path: path,
          data: data,
          onComplete: () =>{
            this.snackBar.open("O poder do seu pokemon aumentou", "OKAY", {duration:3000});

            onComplete();
          },
          onFail: () =>{
            this.snackBar.open("Seu pokemons está com preguissa de treinar...", "OKAY", {duration:3000})
          }
        }
      )
    }

}


