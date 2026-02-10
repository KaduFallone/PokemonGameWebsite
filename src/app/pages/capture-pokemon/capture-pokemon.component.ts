import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { FirebaseApiComponent } from '../../tools/firebase-api/firebase-api.component';
import * as Chance from 'chance';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-capture-pokemon',
  templateUrl: './capture-pokemon.component.html',
  styleUrls: ['./capture-pokemon.component.css']
})
export class CapturePokemonComponent implements OnInit {

  pathTrainerDex = "TrainerDex";
  trainerId = "";
  chance = new Chance.Chance();
  isCapturing: boolean = false;
  pokemonsList: pokeData[] = [];
  sortedePokemon: pokeData | undefined;

  auth = new FirebaseTSAuth();
  firestore = new FirebaseTSFirestore();

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private api: FirebaseApiComponent
  ) { }

  ngOnInit(): void {
    this.auth.getAuth().onAuthStateChanged(user => {
      if(user) {
        this.ngOnInit();
      }
      else{
        this.router.navigate(['/login']);
      }
    });
    
    this.loadPokemons();
  }

  loadPokemons(){
    const path = ["Pokemons"];
    this.api.get(path, (apiList)=> {
      this.pokemonsList = apiList.map (item =>{
        return{
          id: item.docId,
          name:item.name,
          imgUrl:item.imgUrl,
          percentCapture: Number(item.percentCapture)
        }
      });
      console.log("Pokemons carregados com sucesso:", this.pokemonsList)
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
      try{
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
        this.isCapturing = false;
      }catch(erro){
        console.log("Erro no sorteio", erro);
        this.isCapturing = false
      }
    }, 3000);

  }

  
  addPokemon_to_TrainerDex(){

    const userId = this.auth.getAuth().currentUser?.uid;
    const randomPower = Math.floor(Math.random() * 100) + 1;

    if(!userId || !this.sortedePokemon) return;

    this.firestore.create(
      {
        path:["Users", userId, this.pathTrainerDex],
        data: {
          pokeName: this.sortedePokemon.name,
          power: randomPower,
          imgUrl: this.sortedePokemon.imgUrl,
          pokeId: this.sortedePokemon.id,
          captureDate: new Date().toISOString()
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
  power?: number;
  imgUrl: string;
  percentCapture: number;
}
