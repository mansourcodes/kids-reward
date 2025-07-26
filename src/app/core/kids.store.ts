import { Injectable, inject, signal } from '@angular/core';
import { KidsService } from './services/kids.service';
import { RewardService } from './services/reward.service';
import { AuthService } from './services/auth.service';
import { Kid } from './services/kids.service';
import { Reward } from './services/reward.service';

@Injectable({
  providedIn: 'root',
})
export class KidsStore {
  private kidsService = inject(KidsService);
  private rewardService = inject(RewardService);
  private authService = inject(AuthService);

  // Signal to store kids data
  kids = signal<Kid[]>([]);
  // Signal to track loading state
  loading = signal(false);

  async loadKids() {
    this.loading.set(true);
    try {
      const session = await this.authService.getSession();
      if (!session?.data?.session?.user) return;

      const user = session.data.session.user;
      const kids = await this.kidsService.getKidsByUser(user.id);
      this.kids.set(kids);
    } catch (error) {
      console.error('Error loading kids:', error);
    } finally {
      this.loading.set(false);
    }
  }

  async addKid(kid: { name: string; profile_picture_file?: File }) {
    this.loading.set(true);
    try {
      const newKid = await this.kidsService.addKid(kid);
      this.kids.update((kids) => [...kids, newKid]);
    } catch (error) {
      console.error('Error adding kid:', error);
    } finally {
      this.loading.set(false);
    }
  }

  async addReward(reward: Omit<Reward, 'id' | 'user_id' | 'created_at'>) {
    try {
      const newReward = await this.rewardService.addReward(reward);
      this.kids.update((kids) =>
        kids.map((kid) =>
          kid.id === reward.kid_id
            ? { ...kid, rewards: [...kid.rewards, newReward] }
            : kid
        )
      );
    } catch (error) {
      console.error('Error adding reward:', error);
    }
  }
}
