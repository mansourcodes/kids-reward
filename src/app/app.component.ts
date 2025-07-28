import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  template: `<ion-app>
    <ion-router-outlet></ion-router-outlet>
  </ion-app> `,
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.onAuthStateChanged((session) => {
      const user = session?.user;
      this.router.navigateByUrl(user ? '/home' : '/auth/login');
    });
  }
}
