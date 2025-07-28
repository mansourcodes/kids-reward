import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { AlertController } from '@ionic/angular';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
    private alertCtrl: AlertController
  ) {}

  async resetPassword() {
    if (this.newPassword !== this.confirmPassword) {
      this.showAlert('Passwords do not match.');
      return;
    }

    const { error } = await this.authService.resetPassword(this.newPassword);

    if (error) {
      if (error) {
        this.showAlert(error.message || 'Something went wrong.');
      } else {
        this.showAlert('Password reset successful.', true);
      }
    }
  }

  async showAlert(message: string, success: boolean = false) {
    const alert = await this.alertCtrl.create({
      header: success ? 'Success' : 'Error',
      message,
      buttons: ['OK'],
    });
    await alert.present();
    if (success) {
      this.router.navigate(['/auth/profile']);
    }
  }
}
