import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';

import { FirebaseTSApp } from 'firebasets/firebasetsApp/firebaseTSApp';
import { environment } from 'src/environments/environment';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { LoginComponent } from './pages/login/login.component';
import { EmailVerificationComponent } from './pages/email-verification/email-verification.component';
import { InitialPageComponent } from './pages/initial-page/initial-page.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { AddPokemonComponent } from './pages/add-pokemon/add-pokemon.component';
import { FirebaseApiComponent } from './tools/firebase-api/firebase-api.component';
import { CapturePokemonComponent } from './pages/capture-pokemon/capture-pokemon.component';
import { MyPokemonsComponent } from './pages/my-pokemons/my-pokemons.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { PokeDexComponent } from './pages/poke-dex/poke-dex.component'



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    EmailVerificationComponent,
    InitialPageComponent,
    AddPokemonComponent,
    CapturePokemonComponent,
    MyPokemonsComponent,
    UsuariosComponent,
    PokeDexComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatButtonModule,
    MatBottomSheetModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule, 
    ReactiveFormsModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatIconModule,
  ],
  

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor() {
    FirebaseTSApp.init(environment.firebaseConfig);
  }
}
