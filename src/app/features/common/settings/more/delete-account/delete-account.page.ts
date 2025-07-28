import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { IonicModule } from '@ionic/angular';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.page.html',
  styleUrls: ['./delete-account.page.scss'],
  imports: [IonicModule],
})
export class DeleteAccountPage implements OnInit {
  private authService = inject(AuthService);

  constructor(public alertController: AlertController) {}

  ngOnInit() {}

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm Delete Account',
      message: 'Are you sure you want to delete your account?',
      inputs: [
        {
          name: 'confirmText',
          placeholder: 'Type: Delete My Account',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'primary',
        },
        {
          text: 'Delete My Account',
          handler: async (data) => {
            if (data.confirmText === 'Delete My Account') {
              const user = await this.authService.getUser();
              if (!user) {
                return;
              }
              this.authService
                .deleteAccount(user)
                .then(() => {
                  this.authService.signOut();
                })
                .catch((error) => {
                  console.error(error);
                });
            } else {
              this.presentFail();
            }
          },
        },
      ],
    });

    await alert.present();
  }

  async presentFail() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Delete Failed',
      message: 'Failed to delete account. Please try again.',
      buttons: [
        {
          text: 'OK',
        },
      ],
    });

    await alert.present();
  }
}
