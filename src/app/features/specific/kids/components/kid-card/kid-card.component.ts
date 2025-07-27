import {
  Component,
  Input,
  OnInit,
  Signal,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { RewardCardComponent } from '../reward-card/reward-card.component';
import { Kid } from 'src/app/features/specific/kids/services/kids.service';
import { AvatarUrlService } from 'src/app/shared/services/avatar-url.service';

@Component({
  selector: 'app-kid-card',
  standalone: true,
  imports: [CommonModule, IonicModule, RewardCardComponent],
  templateUrl: './kid-card.component.html',
  styleUrls: ['./kid-card.component.scss'],
})
export class KidCardComponent {
  @Input() kid: any;
  private router = inject(Router);
  private avatarUrlService = inject(AvatarUrlService);

  rewards = computed(() => this.kid().rewards);

  getProfilePictureUrl(kid: Kid): SafeUrl {
    return this.avatarUrlService.getAvatarUrl(
      kid.profile_picture_url,
      kid.name
    );
  }

  addReward() {
    this.router.navigate(['/kids/reward-add', this.kid.id]);
  }
}
