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
import { Reward } from 'src/app/core/services/reward.service';
import { Kid } from 'src/app/core/services/kids.service';

@Component({
  selector: 'app-kid-card',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './kid-card.component.html',
  styleUrls: ['./kid-card.component.scss'],
})
export class KidCardComponent {
  @Input() kid: any;
  private router = inject(Router);
  private sanitizer = inject(DomSanitizer);

  rewards = computed(() => this.kid().rewards);

  getAvatarUrl(name: string): SafeUrl {
    const encodedName = encodeURIComponent(name);
    const url = `https://api.dicebear.com/9.x/thumbs/svg?seed=${encodedName}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  addReward() {
    this.router.navigate(['/add-reward', this.kid.id]);
  }
}
