import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { IonicModule } from '@ionic/angular';
import { ProfileCardComponent } from '../../auth/components/profile-card/profile-card.component';
import { addIcons } from 'ionicons';
import {
  ellipsisHorizontalOutline,
  peopleOutline,
  personOutline,
} from 'ionicons/icons';
import { SettingsListComponent } from 'src/app/features/specific/components/settings-list/settings-list.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  imports: [
    IonicModule,
    RouterModule,
    ProfileCardComponent,
    SettingsListComponent,
  ],
})
export class DashboardPage {
  constructor() {
    addIcons({ personOutline, peopleOutline, ellipsisHorizontalOutline });
  }
}
