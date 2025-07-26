import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ProfileCardComponent } from '../components/profile-card/profile-card.component';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, IonicModule, ProfileCardComponent],
  templateUrl: './profile.page.html',
})
export class ProfilePage {}
