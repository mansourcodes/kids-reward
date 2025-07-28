import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { AlertController } from '@ionic/angular/standalone';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';

@Component({
  selector: 'app-otp-verification',
  imports: [CommonModule, IonicModule, FormsModule],
  templateUrl: './otp-verification.page.html',
})
export class OtpVerificationPage {
  mode = 'signup';
  email = '';
  otp = '';
  loading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private errorHandler: ErrorHandlerService
  ) {}

  async ionViewWillEnter() {
    this.email = this.route.snapshot.queryParamMap.get('email') || '';
    this.mode = this.route.snapshot.queryParamMap.get('mode') || 'signup';
  }

  async verifyOtp() {
    this.loading = true;

    // verification
    if (this.otp) {
      const { error } = await this.authService.verifyOtp(this.email, this.otp);

      if (error) {
        this.errorHandler.handleError(error);
      } else if (this.mode === 'reset-password') {
        this.router.navigate(['/auth/reset-password']);
      } else {
        this.router.navigate(['/home']);
      }
    }
    this.loading = false;
  }

  async resendOtp() {
    this.loading = true;
    const { error } = await this.authService.sendOtp(this.email);
    this.loading = false;

    if (error) {
      this.errorHandler.handleError(error);
    }
  }
}
