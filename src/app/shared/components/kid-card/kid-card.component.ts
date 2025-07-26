import { Component, Input, OnInit, effect, inject } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RewardService } from '../../../core/services/reward.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-kid-card',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './kid-card.component.html',
  styleUrls: ['./kid-card.component.scss'],
})
export class KidCardComponent implements OnInit {
  @Input() kid: any;
  rewards: any[] = [];
  private rewardService = inject(RewardService);
  private router = inject(Router);
  private sanitizer = inject(DomSanitizer);

  constructor() {
    // Watch for reward additions for this specific kid
    effect(() => {
      const kidId = this.rewardService.rewardAdded();
      if (kidId === this.kid?.id) {
        this.loadRewards();
      }
    });
  }

  ngOnInit(): void {
    // Load initial rewards
    this.loadRewards();
  }

  getAvatarUrl(name: string): SafeUrl {
    const encodedName = encodeURIComponent(name);
    const url = `https://api.dicebear.com/9.x/thumbs/svg?seed=${encodedName}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  async loadRewards() {
    try {
      this.rewards = await this.rewardService.getRewardsByKid(this.kid.id);
    } catch (error) {
      console.error('Error loading rewards:', error);
    }
  }

  addReward() {
    this.router.navigate(['/add-reward', this.kid.id]);
  }
}
