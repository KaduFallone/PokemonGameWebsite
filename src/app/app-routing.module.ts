import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { EmailVerificationComponent } from './pages/email-verification/email-verification.component';
import { InitialPageComponent } from './pages/initial-page/initial-page.component';
import { AddPokemonComponent } from './pages/add-pokemon/add-pokemon.component';
import { CapturePokemonComponent } from './pages/capture-pokemon/capture-pokemon.component';
import { MyPokemonsComponent } from './pages/my-pokemons/my-pokemons.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'email-verification', component: EmailVerificationComponent},
  {path: 'initial-page', component: InitialPageComponent},
  {path: 'add-pokemon', component: AddPokemonComponent},
  {path: 'capture-page', component: CapturePokemonComponent},
  {path: 'my-pokemons', component: MyPokemonsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
