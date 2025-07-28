import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AlertController } from '@ionic/angular/standalone';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  imports: [IonicModule, CommonModule, FormsModule, RouterModule],
})
export class LoginPage {
  email = '';
  password = '';
  loading = false;

  constructor(
    public authService: AuthService,
    private router: Router,
    private errorHandler: ErrorHandlerService
  ) {}

  async login() {
    this.loading = true;
    const { data, error } = await this.authService.signIn(
      this.email,
      this.password
    );
    this.loading = false;

    if (error) {
      this.errorHandler.handleError(error);
    } else if (data.user) {
      this.router.navigateByUrl('/home');
    }
  }
}
