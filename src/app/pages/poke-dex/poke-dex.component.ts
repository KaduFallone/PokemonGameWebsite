import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';

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
  ) { }

  pokemonsName: string = "";
  pokemonsId: string | number = "";
  pokemonsImg: string = "";

  ngOnInit(): void {
    const user = this.auth.getAuth().onAuthStateChanged((user) => {
      if(user){
        this.renderPokemon('arceus')
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
    const data = await this.fetchPokemon(pokemon);

    if(data){
      this.pokemonsName = data.name;
      this.pokemonsId = data.id;
      this.pokemonsImg = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    }
    else{
      this.pokemonsName = "Not found";
      this.pokemonsId = "";
      this.pokemonsImg = "";
    }

  }

  onSearch(event: Event, value: string){
    event.preventDefault();

    this.renderPokemon(value.toLocaleLowerCase());
  }

  
  

}
