import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { StorageService } from 'src/app/core/services/storage.service';

@Component({
  selector: 'app-signup',
  imports: [CommonModule, IonicModule, FormsModule],
  templateUrl: './signup.page.html',
})
export class SignupPage {
  email = '';
  password = '';
  loading = false;
  error = '';
  success = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private storageService: StorageService
  ) {}

  async signup() {
    this.loading = true;
    this.error = '';
    this.success = '';

    const { error } = await this.authService.signUp(this.email, this.password);
    this.loading = false;

    if (error) {
      this.error = error.message;
    } else {
      // send OTP email
      const result = await this.authService.sendOtp(this.email);

      // Redirect to OTP verification
      this.router.navigate(['/auth/otp-verification'], {
        queryParams: { email: this.email, mode: 'signup' },
      });
    }
  }
}
