import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'PokellenttWebsite';

  firestore = new FirebaseTSFirestore;
  auth = new FirebaseTSAuth

  isAdmin: boolean = false;
  
  userRole ='';

  showNavbar: boolean = true;

  constructor(private router: Router) {
    //verificar se o user esta logado
    this.firestore = new FirebaseTSFirestore();
    this.auth = new FirebaseTSAuth();
    
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      const hideRoutes = ['/login', '/home', '/'];
      this.showNavbar = !hideRoutes.includes(event.urlAfterRedirects);
    });

    this.auth.getAuth().onAuthStateChanged((user) => {
      if(user){
        this.getUserRole(user.uid)
      }
      else{
        this.userRole = "";
        this.isAdmin = false;
      }
    })
  }
  //Pega a role para saber se é admin ou apenas trainer(jogador)
  getUserRole(uid:string){
    this.firestore.listenToDocument(
      {
        name: "GetProfileRole",
        path: ["Users", uid],
        onUpdate: (result) => {
          const data = result.data();
          if(data) {
            this.userRole = data['role'];
            this.isAdmin = (this.userRole === "admin")
          }
        }
      }
    )
  }

  //funções dos botões da nav-bar
  onLogoutClick(){
    this.auth.signOut()
    this.router.navigate([''])
  }

}
