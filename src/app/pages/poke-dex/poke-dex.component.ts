import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { MatSnackBar } from '@angular/material/snack-bar';

//variaveis globais

@Component({
  selector: 'app-poke-dex',
  templateUrl: './poke-dex.component.html',
  styleUrls: ['./poke-dex.component.css']
})
export class PokeDexComponent implements OnInit {

  auth = new FirebaseTSAuth();

  constructor(
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  pokemonsName: string = "";
  pokemonsId: string | number = "";
  pokemonsImg: string = "";
  currentPokemonId: number = 1;

  ngOnInit(): void {
    const user = this.auth.getAuth().onAuthStateChanged((user) => {
      if(user){
        this.renderPokemon('1')
      }
      else{
        this.router.navigate(['/login'])
      }
    })
  }

   async fetchPokemon ( pokemon: string | number ){
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    return APIResponse.status === 200 ? await APIResponse.json(): null;

    
  }

    
  

  async renderPokemon (pokemon: string|number){
    this.pokemonsName = "Carregando...";
    this.pokemonsId = "";
    this.pokemonsImg = "";

    const data = await this.fetchPokemon(pokemon);

    if(data){
      this.pokemonsName = data.name;
      this.pokemonsId = data.id;
      this.currentPokemonId = data.id;
      this.pokemonsImg = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    }
    else{
      this.pokemonsName = "não encontrado";
      this.pokemonsId = "???";
      this.pokemonsImg = "";
      this.snackBar.open('Pokemon não encontrado', 'OKAY', {duration:3000});
    }

  }

  onSearch(event: Event, value: string){
    event.preventDefault();

    this.renderPokemon(value.toLocaleLowerCase());
  }

  onPrevClick(){
    if(this.currentPokemonId > 1){
      this.currentPokemonId--;
      this.renderPokemon(this.currentPokemonId);
    }
  }

  onNextClick(){
    this.currentPokemonId++;
    this.renderPokemon(this.currentPokemonId);
  }
  

}
