import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    
  firestore: FirebaseTSFirestore

  state = AuthenticatorState.LOGIN

  auth = new FirebaseTSAuth

  constructor(
    private matSnackBar: MatSnackBar,
    private router: Router
  ) { 
    this.auth = new FirebaseTSAuth();
    this.firestore = new FirebaseTSFirestore();
  }
 ngOnInit(): void {
  }

// Pegar status do autienticador
  onForgotPasswordClick(){
    this.state = AuthenticatorState.FORGOT_PASSWORD;
  }

  onCreateAccountClick(){
    this.state = AuthenticatorState.REGISTER;
  }

  onLoginClick(){
    this.state = AuthenticatorState.LOGIN;
  }

  isLoginState(){
    return this.state === AuthenticatorState.LOGIN;
  }
  
  isRegisterState(){
    return this.state === AuthenticatorState.REGISTER;
  }

  isForgotPasswordState(){
    return this.state === AuthenticatorState.FORGOT_PASSWORD;
  }


  getStateText(){
    switch(this.state){
      case AuthenticatorState.LOGIN:
        return "Login";
      case AuthenticatorState.REGISTER:
        return "Registrar Conta";
      case AuthenticatorState.FORGOT_PASSWORD:
        return "Recuperar Senha";
      default:
        return "";
    }
  }

  //Autentificação de espaço formularios vazio e senhas = confirmar senha 

  isMatch(senha:string, confirmarSenha:string){
    return senha == confirmarSenha;
  }

  isNotEmpty(texto:string){
    return texto != null && texto.length > 0;
  }

  //Criação de de usuario, mudança de senha e login
  //Login
  onLogin(
    loginEmial:HTMLInputElement,
    loginPassword:HTMLInputElement
  ){
    let email = loginEmial.value;
    let senha = loginPassword.value;

    if (
      this.isNotEmpty(email) &&
      this.isNotEmpty(senha)
    ){
      this.auth.signInWith(
        {
          email: email,
          password: senha,
          onComplete: (uc) =>{
            if(uc.user?.emailVerified){
              this.matSnackBar.open('Login feito com sucesso!!', 'OKAY', {duration: 4000});
              this.router.navigate(['/initial-page']);
            }
            else{
              this.auth.signOut();
              this.matSnackBar.open('Faça a verificação de conta', 'OKAY', {duration: 4000});
              this.router.navigate(['/email-verification'])
              this.auth.sendVerificaitonEmail();
            }
          },
          onFail: (err) =>{
            this.matSnackBar.open('Falha no login', 'OKAY' + err, {duration: 4000});
          }
        }
      );
    }
    else{
      this.matSnackBar.open('Preencha todos os campos', 'OKAY')
    }
  }

  //Registrar
  onRegister(
    registerName:HTMLInputElement,
    registerEmail:HTMLInputElement,
    registerPassword:HTMLInputElement,
    registerConfirmPassword:HTMLInputElement
  ){
    let nome = registerName.value.trim();
    let email = registerEmail.value;
    let senha = registerPassword.value;
    let confirmarSenha = registerConfirmPassword.value;

    if(!this.isNotEmpty(email) || !this.isNotEmpty(senha) || !this.isNotEmpty(confirmarSenha)){
      this.matSnackBar.open('preencha todos os campos', 'OKAY', {duration: 4000});
    }

    else if(!this.isMatch(senha, confirmarSenha)){
      this.matSnackBar.open('As senhas não conferem', 'OKAY', {duration: 4000});
    }

     else if(
      this.isNotEmpty(nome) &&
      this.isNotEmpty(email) &&
      this.isNotEmpty(senha) &&
      this.isNotEmpty(confirmarSenha) &&
      this.isMatch(senha, confirmarSenha) 
    ){
      this.auth.createAccountWith(
        {
          email:email,
          password:senha,
          onComplete: (uc) =>{
            this.firestore.create(
              {
                path: ["Users", uc.user!.uid],
                data:{
                  userEmail: email,
                  userId: uc.user?.uid,
                  publicName: nome,
                  role: "trainer",
                  createdAt: new Date().toISOString()
                }
              }
            );

            this.matSnackBar.open('Conta criada com sucesso! Faça a verificação da conta', 'OKAY', {duration: 4000})

            registerEmail.value = "";
            registerPassword.value = "";
            registerConfirmPassword.value = "";

            this.router.navigate(['/email-verification']);
            this.auth.sendVerificaitonEmail();
            
          },
          onFail: (err) => {
            this.matSnackBar.open('Falha ao criar login',  'OKAY' + err, {duration: 4000})
          }
        }
      );
    }
  }

  //Redefinir senha
  onResetClick(resetEmail:HTMLInputElement){
    let email = resetEmail.value;
    if (this.isNotEmpty(email)){
      this.auth.sendPasswordResetEmail(
        {
          email:email,
          onComplete: (err) => {
            this.matSnackBar.open(`Email enviado para: ${email}`, 'okay', {duration: 4000})
          }
        }
      );
    }
  }

}

export enum AuthenticatorState{
  LOGIN,
  REGISTER,
  FORGOT_PASSWORD,
  EMAIL_VERIFICATION
}


            