import { Component, OnInit } from '@angular/core';
import { FirebaseApiComponent } from 'src/app/tools/firebase-api/firebase-api.component';
import * as Chance from 'chance';

@Component({
  selector: 'app-capture-pokemon',
  templateUrl: './capture-pokemon.component.html',
  styleUrls: ['./capture-pokemon.component.css']
})
export class CapturePokemonComponent implements OnInit {
  path = "Pokemons"
  chance = new Chance.Chance();

  constructor(
    private api: FirebaseApiComponent
  ) { }

  ngOnInit(): void {
  }

  onCaptureClick(aoTerminar: (lista: pokeData[]) => void){
    this.api.get(this.path, (docsBrutos)=> {
      let finaList: pokeData[]=[];

      docsBrutos.forEach(doc => {
        const dados = doc.data();

        finaList.push(
          {
            id: doc.id,
            name: dados['name'],
            imgUrl: dados['imgUrl'],
            percentCapture: Number(dados['percentCapture'])
          }
        );
      });
      aoTerminar(finaList);
    });
    
  
    //this.api.addDB();
  }

}

export interface pokeData {
  id: string;
  name: string;
  imgUrl: string;
  percentCapture: number;
}
