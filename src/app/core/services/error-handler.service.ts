import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({ providedIn: 'root' })
export class ErrorHandlerService {
  constructor(private alertController: AlertController) {}

  async handleError(error: any, fallbackMessage = 'Something went wrong') {
    console.error('Logged Error:', error);

    let message = fallbackMessage;

    if (typeof error === 'string') {
      message = error;
    } else if (error?.message) {
      message = error.message;
    } else if (error?.error?.message) {
      message = error.error.message;
    }

    const alert = await this.alertController.create({
      message,
    });

    await alert.present();
  }
}
