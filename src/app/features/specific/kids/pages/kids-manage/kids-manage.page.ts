import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { KidsStore } from '../../state/kids.store';
import { RouterModule } from '@angular/router';
import { AvatarUrlService } from 'src/app/shared/services/avatar-url.service';
import { SafeUrl } from '@angular/platform-browser';
import { Kid } from '../../services/kids.service';

@Component({
  selector: 'app-kids-manage',
  templateUrl: './kids-manage.page.html',
  styleUrls: ['./kids-manage.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule],
})
export class KidsManagePage implements OnInit {
  private kidsStore = inject(KidsStore);
  private avatarUrlService = inject(AvatarUrlService);

  // Expose store properties directly
  kids = this.kidsStore.kids;
  loading = this.kidsStore.loading;

  constructor() {}

  getProfilePictureUrl(kid: Kid): SafeUrl {
    return this.avatarUrlService.getAvatarUrl(
      kid.profile_picture_url,
      kid.name
    );
  }

  async ngOnInit() {
    // await this.kidsStore.loadKids();
  }
}
