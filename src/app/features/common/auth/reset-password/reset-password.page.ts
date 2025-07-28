import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { AlertController } from '@ionic/angular';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
  imports: [IonicModule, CommonModule, FormsModule],
})
export class ResetPasswordPage {
  email: string = '';
  otp: string = '';
  newPassword: string = '';
  confirmPassword: string = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private errorHandler: ErrorHandlerService
  ) {}

  async resetPassword() {
    if (this.newPassword !== this.confirmPassword) {
      this.errorHandler.handleError('Passwords do not match.');
      return;
    }

    const { error } = await this.authService.resetPassword(this.newPassword);

    if (error) {
      this.errorHandler.handleError(error);
    } else {
      this.errorHandler.handleError('Password reset successful.');
      this.router.navigate(['/auth/profile']);
    }
  }
}
