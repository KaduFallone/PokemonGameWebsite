import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { FirebaseTSFirestore, OrderBy } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
import { FirebaseApiComponent } from 'src/app/tools/firebase-api/firebase-api.component';

@Component({
  selector: 'app-my-pokemons',
  templateUrl: './my-pokemons.component.html',
  styleUrls: ['./my-pokemons.component.css']
})
export class MyPokemonsComponent implements OnInit {

  auth = new FirebaseTSAuth();
  firestore = new FirebaseTSFirestore();

  constructor(
    private router: Router,
    private api: FirebaseApiComponent
  ) { }

  ngOnInit(): void {
    this.auth.getAuth().onAuthStateChanged((user)=> {
      if(user){
        this.getPlayerPokemons();
      }
      else{
        this.router.navigate(['/login'])
      }
    })
  }

  trainerPokemons: any [] = [];

  

  getPlayerPokemons(){  
    const userId = this.auth.getAuth().currentUser?.uid;

    if(!userId) return;

    const path = ["Users", userId, "TrainerDex"];

    this.api.get(path, (DBList: any[]) =>{
      this.trainerPokemons = DBList.map(item =>({
        docId: item.docId,
        name: item.pokeName || item.name,
        imgUrl: item.imgUrl,
        power: item.power,
      }));
      console.log("Pokemons carregados", this.trainerPokemons)
    });
  }

  onReleasePokemonClick(){

  }

  onGetStrongrClick(){
    
  }

}





