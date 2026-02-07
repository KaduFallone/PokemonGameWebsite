import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { FirebaseApiComponent } from '../../tools/firebase-api/firebase-api.component';
import * as Chance from 'chance';

@Component({
  selector: 'app-capture-pokemon',
  templateUrl: './capture-pokemon.component.html',
  styleUrls: ['./capture-pokemon.component.css']
})
export class CapturePokemonComponent implements OnInit {
  path = "Pokemons"
  chance = new Chance.Chance();

  pokemonsList: pokeData[] = [];
  sortedePokemon: pokeData | undefined;


  constructor(
    private snackBar: MatSnackBar,
    private api: FirebaseApiComponent
  ) { }

  ngOnInit(): void {
  }

  onCaptureClick(){
    this.api.get(this.path, (docsBrutos)=> {
      let tempList: pokeData[]=[];

      docsBrutos.forEach((doc: any) => {
        const dados = doc.data();
        let tempList: pokeData[] =[];

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
    
    if(this.pokemonsList.length === 0){
    this.snackBar.open("Carregando pokemosn do DB", "OKAY", {duration: 3000});
      return;
    }

    const pokeIds = this.pokemonsList.map(p => p.id);
    const captureChance = this.pokemonsList.map(p => p.percentCapture);

    const IdWinner = this.chance.weighted(pokeIds, captureChance);

    this.sortedePokemon = this.pokemonsList.find(p => p.id === IdWinner);
    console.log("Pokemon capturado:", this.sortedePokemon?.name);
  
    //this.api.addDB();
  }

}

export interface pokeData {
  id: string;
  name: string;
  imgUrl: string;
  percentCapture: number;
}
