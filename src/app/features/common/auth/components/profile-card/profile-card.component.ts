import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { User } from '@supabase/supabase-js';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss'],
  imports: [CommonModule, IonicModule],
})
export class ProfileCardComponent implements OnInit {
  @Input() showLogout = false;

  user: User | null = null;

  constructor(
    private authService: AuthService,
    private alertController: AlertController,
    private router: Router
  ) {}

  async ngOnInit() {
    const { data } = await this.authService.getSession();
    this.user = data.session?.user ?? null;
  }

  async logout() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Logout',
      message: 'Are you sure you want to logout?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'primary',
          handler: (blah) => {},
        },
        {
          text: 'Logout',
          handler: () => {
            this.authService
              .signOut()
              .then(() => this.router.navigateByUrl('/auth/login'));
          },
        },
      ],
    });

    await alert.present();
  }
}
