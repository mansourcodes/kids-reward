import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router, RouterModule } from '@angular/router';
import {
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonButton,
  IonInput,
  IonText,
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  imports: [
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonButton,
    IonInput,
    IonText,
    CommonModule,
    FormsModule,
    RouterModule,
  ],
})
export class LoginPage {
  email = '';
  password = '';
  error = '';
  loading = false;

  constructor(private auth: AuthService, private router: Router) {}

  async login() {
    this.loading = true;
    const { error } = await this.auth.signIn(this.email, this.password);
    this.loading = false;

    if (error) {
      this.error = error.message;
    } else {
      this.router.navigateByUrl('/home');
    }
  }
}
