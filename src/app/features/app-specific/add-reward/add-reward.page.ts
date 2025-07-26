import { Component, inject } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { RewardService } from '../../../core/services/reward.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  IonContent,
  IonInput,
  IonButton,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonBackButton,
  IonButtons,
  IonItem,
  IonLabel,
  IonSpinner,
  IonSelect,
  IonSelectOption,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-add-reward',
  templateUrl: 'add-reward.page.html',
  styleUrls: ['add-reward.page.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    IonContent,

    IonButton,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonBackButton,
    IonButtons,
    IonItem,
    IonLabel,
    IonSpinner,
    IonSelect,
    IonSelectOption,
  ],
})
export class AddRewardPage {
  private rewardService = inject(RewardService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  kidId: string | null = null;
  addRewardForm: FormGroup;
  loading = false;
  emojis = ['⭐', '👍', '👏', '🎉', '🏆', '❤️', '👎', '😠', '💔'];

  constructor() {
    this.addRewardForm = new FormGroup({
      emoji: new FormControl('', Validators.required),
      is_good: new FormControl(true, Validators.required),
    });
  }

  ionViewWillEnter() {
    this.kidId = this.route.snapshot.paramMap.get('kidId');
  }

  async onSubmit() {
    if (this.addRewardForm.invalid || !this.kidId) return;

    this.loading = true;
    try {
      await this.rewardService.addReward({
        kid_id: this.kidId,
        emoji: this.addRewardForm.value.emoji,
        is_good: this.addRewardForm.value.is_good,
      });
      this.router.navigate(['/tabs/kids-list']);
    } catch (error) {
      console.error('Error adding reward:', error);
      this.loading = false;
    }
  }
}
