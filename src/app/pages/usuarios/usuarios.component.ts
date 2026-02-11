import { Component, OnInit } from '@angular/core';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FirebaseApiComponent } from 'src/app/tools/firebase-api/firebase-api.component';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  auth = new FirebaseTSAuth();
  firestore = new FirebaseTSFirestore();

  constructor(
    private api: FirebaseApiComponent,
    private snackbar: MatSnackBar
  ) { }

  showPokemons: boolean = false;
  userPokemonList: any[] =[];
  selectedUserId: string | null= null;

  ngOnInit(): void {
    this.getUsersInfo();
    
  }

  users: any[] =[]

  getUsersInfo(){
    const path = ["Users"]
    this.api.get(path, (userList) => {
      this.users = userList.map (item => {
        return{
          userId: item.userId || item.docId,
          publicName: item.publicName,
          role: item.role || "trainer",
          userEmail: item.userEmail,
          createdAt: item.createdAt
        }
      })
      console.log(this.users);
    })
  }

  onInspectClick(userId: string){
    if(this.selectedUserId === userId){
      this.selectedUserId = null;
      this.userPokemonList = [];
      this.showPokemons = false;
      console.log("Fechando vizualização...");
      return;
    }

    this.selectedUserId = userId;
    this.userPokemonList = [];

    const path = ["Users", userId, "TrainerDex"]


    this.api.get(path, (pokemonList) => {
      this.userPokemonList = pokemonList.map (poke => {
        return{
          captureDate: poke.captureDate,
          imgUrl: poke.imgUrl,
          pokeId: poke.pokeId,
          pokeName: poke.pokeName || poke.name,
          power: poke.power
        }
      });
      this.showPokemons = true;
      console.log(this.userPokemonList)
    })
  }


  onDeleteClick(pokemon: any){
    const confirmacao = confirm(`Deseja deleta o ${pokemon.pokeName} deste treinador`);

    const path = ["Users", this.selectedUserId, "TrainerDex", pokemon.pokeId];

    if(confirmacao){
      this.api.delete(path, () => {
        this.snackbar.open(`${pokemon.pokeName} deletado com sucesso`, "OKAY", {duration: 3000});

        this.userPokemonList = this.userPokemonList.filter(p => p.pokeId !== pokemon.pokeId)
      })
    }
  }

  onReturnClick(){
    this.showPokemons = false;
  this.selectedUserId = null; 
  this.userPokemonList = [];
  }

}
