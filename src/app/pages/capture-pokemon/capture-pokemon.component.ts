import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { FirebaseApiComponent } from '../../tools/firebase-api/firebase-api.component';
import * as Chance from 'chance';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';

@Component({
  selector: 'app-capture-pokemon',
  templateUrl: './capture-pokemon.component.html',
  styleUrls: ['./capture-pokemon.component.css']
})
export class CapturePokemonComponent implements OnInit {
  path = "Pokemons"
  pathTrainerDex = "TrainerDex"
  trainerId = "";
  chance = new Chance.Chance();
  isCapturing: boolean = false;
  pokemonsList: pokeData[] = [];
  sortedePokemon: pokeData | undefined;

  auth = new FirebaseTSAuth();
  firestore = new FirebaseTSFirestore();

  constructor(
    private snackBar: MatSnackBar,
    private api: FirebaseApiComponent
  ) { 
    
  }

  ngOnInit(): void {
    this.loadPokemons();
  }

  loadPokemons(){
    this.api.get(this.path, (docsBrutos)=> {
      let tempList: pokeData[]=[];
  
      docsBrutos.forEach((doc: any) => {
        const dados = doc.data();
  
        tempList.push(
          {
            id: doc.id,
            name: dados['name'],
            imgUrl: dados['imgUrl'],
            percentCapture: Number(dados['percentCapture'])
          }
        );
      });
      this.pokemonsList = tempList;
      console.log("Pokemons carregados:", this.pokemonsList.length);
    });
  }

  onCaptureClick(){
    if(this.pokemonsList.length === 0){
      this.snackBar.open("Procurando por pokemons...", "OKAY", {duration: 3000});
      this.loadPokemons();
      return;
    }

    this.isCapturing = true;
    this.sortedePokemon = undefined;

    setTimeout(() => {
      const pokeIds = this.pokemonsList.map(p => p.id);
      const captureChance = this.pokemonsList.map(p => p.percentCapture);
  
      const IdWinner = this.chance.weighted(pokeIds, captureChance);
  
      this.sortedePokemon = this.pokemonsList.find(p => p.id === IdWinner);
      console.log("Pokemon capturado:", this.sortedePokemon?.name);
      
      this.isCapturing = false;

      if(this.sortedePokemon){
        this.snackBar.open(`Você capturou um ${this.sortedePokemon.name}`, "OKAY", {duration: 3000 });

        this.addPokemon_to_TrainerDex();
      } 
      console.log(this.pokemonsList);
    }, 5000);

  }

  
  addPokemon_to_TrainerDex(){

    const userId = this.auth.getAuth().currentUser?.uid;

    if(!userId || !this.sortedePokemon) return;

    this.firestore.create(
      {
        path:["Users", userId, this.pathTrainerDex],
        data: {
          pokeName: this.sortedePokemon.name,
          imgUrl: this.sortedePokemon.imgUrl,
          pokeId: this.sortedePokemon.id,
          captureDate: Date.now()
        },
        onComplete: (docId) => {
          this.snackBar.open("Pokemon enviado para seu PC", "OKAY", {duration: 3000})
        },
        onFail: (err) => {
          this.snackBar.open("O pokemon escapou","OKAY", {duration: 3000})
        }
      }
    )
  }

}

export interface pokeData {
  id: string;
  name: string;
  imgUrl: string;
  percentCapture: number;
}
