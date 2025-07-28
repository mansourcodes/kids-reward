import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AlertController } from '@ionic/angular/standalone';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  imports: [IonicModule, CommonModule, FormsModule, RouterModule],
})
export class LoginPage {
  email = '';
  password = '';
  error = '';
  loading = false;

  constructor(
    public auth: AuthService,
    private router: Router,
    private alertController: AlertController
  ) {}

  async login() {
    this.loading = true;
    const { data, error } = await this.auth.signIn(this.email, this.password);
    this.loading = false;

    if (error) {
      this.error = error.message;
      this.alertController
        .create({
          header: 'Error',
          message: error.message,
          buttons: ['OK'],
        })
        .then((alert) => alert.present());

      return;
    } else if (data.user) {
      this.router.navigateByUrl('/home');
    }
  }
}
