import { Component, OnInit } from '@angular/core';
import { FirebaseApiComponent } from 'src/app/tools/firebase-api/firebase-api.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-pokemon',
  templateUrl: './add-pokemon.component.html',
  styleUrls: ['./add-pokemon.component.css']
})
export class AddPokemonComponent implements OnInit {
  auth = new FirebaseTSAuth

  path = "Pokemons";

  constructor(
    private router: Router,
    private matSnackbar: MatSnackBar,
    private api: FirebaseApiComponent
  ){
    this.auth = new FirebaseTSAuth();

    this.auth.getAuth().onAuthStateChanged(user =>{
      if(user){
        this.ngOnInit();
      }
      else{
        this.router.navigate(['/login']);
      }
    })
    
  }

  ngOnInit(): void {
  }

  isNotEmpty(texto:string){
    return texto != null && texto.length > 0;
  }

  onSubmitClick(pokemonName: HTMLInputElement, imageUrl: HTMLInputElement, percentualCaputura: HTMLInputElement){
    let pokeName = pokemonName.value;
    let imgUrl = imageUrl.value;
    let percentCapture = percentualCaputura.value

    if(
      this.isNotEmpty(pokeName)&&
      this.isNotEmpty(imgUrl)&&
      this.isNotEmpty(percentCapture)
    ){
      this.api.addDB(
        this.path,
        pokeName,
        imgUrl,
        percentCapture
      );

      this.matSnackbar.open('Pokemons adicionado ao DB com sucesso!', 'OKAY', {duration: 3000})

      pokemonName.value = "";
      imageUrl.value = "";
      percentualCaputura.value = "";

    }
    else{
      this.matSnackbar.open('Preencha todos os campos', 'OKAY', {duration: 3000})
    }


  }
}
