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

  onChangeClick(userId: string){
    if(this.selectedUserId == userId){
      this.selectedUserId = null;
      this.userPokemonList = [];
      console.log("Fechando vizualização...");
      return;
    }

    this.selectedUserId = userId;
    this.userPokemonList = [];

    const path = ["Users", userId, "TrainerDex"]


    this.api.get(path, (pokemonList) => {
      this.userPokemonList = pokemonList.map (poke => {
        if(!pokemonList){
          this.userPokemonList = [];
          return;
        }
        
        return{
          captureDate: poke.captureDate,
          imgUrl: poke.imgUrl,
          pokeId: poke.pokeId,
          pokeName: poke.pokeName || poke.name,
          power: poke.power
        }
      });
      console.log(this.userPokemonList)
    })
  }

}
