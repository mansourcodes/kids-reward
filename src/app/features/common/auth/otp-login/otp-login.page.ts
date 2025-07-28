import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';

@Component({
  selector: 'app-otp-login',
  templateUrl: './otp-login.page.html',
  styleUrls: ['./otp-login.page.scss'],
  imports: [IonicModule, CommonModule, FormsModule],
})
export class OtpLoginPage {
  email = '';
  loading = false;

  constructor(
    public authService: AuthService,
    private router: Router,
    private errorHandler: ErrorHandlerService
  ) {}

  async requestOtp() {
    this.loading = true;
    const { error } = await this.authService.sendOtp(this.email);
    this.loading = false;

    if (error) {
      this.errorHandler.handleError(error);
    } else {
      this.router.navigate(['/auth/otp-verification'], {
        queryParams: { email: this.email, mode: 'reset-password' },
      });
    }
  }
}
