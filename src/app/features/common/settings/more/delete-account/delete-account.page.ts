import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.page.html',
  styleUrls: ['./delete-account.page.scss'],
  imports: [IonicModule],
})
export class DeleteAccountPage implements OnInit {
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
          handler: (data) => {
            if (data.confirmText == 'Delete My Account') {
              this.presentAskForLoginAgain();
            } else {
              this.presentFail();
            }
          },
        },
      ],
    });

    await alert.present();
  }

  async presentAskForLoginAgain() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm Authentication',
      message: 'Please enter your email and password to confirm.',
      inputs: [
        {
          name: 'email',
          placeholder: 'Email',
        },
        {
          name: 'password',
          placeholder: 'Password',
          type: 'password',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'primary',
        },
        {
          text: 'Confirm',
          handler: (data) => {
            const email = data.email;
            const password = data.password;
            // TODO: Call API to confirm authentication
            // TODO: Call API to delete account if authentication is confirmed
          },
        },
      ],
    });

    await alert.present();
  }

  async presentFail() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'ALERTS.DELETE_CANCELED_TITLE',
      message: 'ALERTS.DELETE_CANCELED_MESSAGE',
      buttons: [
        {
          text: 'COMMON.OK',
        },
      ],
    });

    await alert.present();
  }
}
