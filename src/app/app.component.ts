import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'PokellenttWebsite';

  showNavbar: boolean = true;

  constructor(private router: Router) {
    
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      const hideRoutes = ['/login', '/home', '/'];
      this.showNavbar = !hideRoutes.includes(event.urlAfterRedirects);
    });
  }
}
