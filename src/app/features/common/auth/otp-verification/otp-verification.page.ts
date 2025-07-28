import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { AlertController } from '@ionic/angular/standalone';

@Component({
  selector: 'app-otp-verification',
  imports: [CommonModule, IonicModule, FormsModule],
  templateUrl: './otp-verification.page.html',
})
export class OtpVerificationPage {
  email = '';
  otp = '';
  loading = false;
  error = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private alertController: AlertController
  ) {}

  async ionViewWillEnter() {
    this.email = this.route.snapshot.queryParamMap.get('email') || '';
  }

  async verifyOtp() {
    this.loading = true;
    this.error = '';

    try {
      // verification
      if (this.otp) {
        const result = await this.authService.verifyOtp(this.email, this.otp);
        this.router.navigate(['/home']);
      } else {
        throw new Error('Invalid OTP code. Please try again.');
      }
    } catch (error: any) {
      this.error = error.message || 'Failed to verify OTP. Please try again.';

      this.alertController
        .create({
          message: this.error,
        })
        .then((alert) => {
          alert.present();
        });
    } finally {
      this.loading = false;
    }
  }

  async resendOtp() {
    this.loading = true;
    this.error = '';

    try {
      // resend the OTP via Supabase
      const result = await this.authService.sendOtp(this.email);
    } catch (error: any) {
      this.error = error.message || 'Failed to resend OTP. Please try again.';

      this.alertController
        .create({
          message: this.error,
        })
        .then((alert) => {
          alert.present();
        });
    } finally {
      this.loading = false;
    }
  }
}
