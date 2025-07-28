import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  imports: [CommonModule, IonicModule, FormsModule],
})
export class SignupPage {
  email = '';
  password = '';
  loading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private errorHandler: ErrorHandlerService
  ) {}

  async signup() {
    this.loading = true;
    const { error } = await this.authService.signUp(this.email, this.password);
    this.loading = false;

    if (error) {
      this.errorHandler.handleError(error);
    } else {
      this.sendOtp();
    }
  }

  private async sendOtp() {
    const { error } = await this.authService.sendOtp(this.email);

    if (error) {
      this.errorHandler.handleError(error);
    } else {
      this.router.navigate(['/auth/otp-verification'], {
        queryParams: { email: this.email, mode: 'signup' },
      });
    }
  }
}
