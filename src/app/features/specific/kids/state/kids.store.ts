import { Injectable, inject, signal } from '@angular/core';
import { KidsService } from '../services/kids.service';
import { RewardService } from '../services/reward.service';
import { AuthService } from '../../../../core/services/auth.service';
import { Kid } from '../services/kids.service';
import { Reward } from '../services/reward.service';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';

@Injectable({
  providedIn: 'root',
})
export class KidsStore {
  private kidsService = inject(KidsService);
  private rewardService = inject(RewardService);
  private authService = inject(AuthService);
  private errorHandler = inject(ErrorHandlerService);

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
      this.errorHandler.handleError(error);
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
      this.errorHandler.handleError(error);
    } finally {
      this.loading.set(false);
    }
  }

  async updateKid(kid: Kid, profile_picture_file?: File) {
    this.loading.set(true);
    try {
      const updatedKid = await this.kidsService.updateKid(
        kid,
        profile_picture_file
      );
      this.kids.update((kids) =>
        kids.map((k) => (k.id == kid.id ? { ...updatedKid } : k))
      );
    } catch (error) {
      this.errorHandler.handleError(error);
    } finally {
      this.loading.set(false);
    }
  }

  async deleteKid(kid: Kid) {
    this.loading.set(true);
    try {
      await this.kidsService.deleteKid(kid);
      this.kids.update((kids) => kids.filter((k) => k.id != kid.id));
    } catch (error) {
      this.errorHandler.handleError(error);
    } finally {
      this.loading.set(false);
    }
  }

  async addReward(reward: Omit<Reward, 'id' | 'user_id' | 'created_at'>) {
    try {
      const newReward = await this.rewardService.addReward(reward);

      this.kids.update((kids) =>
        kids.map((kid) =>
          kid.id == reward.kid_id
            ? { ...kid, rewards: [...kid.rewards, newReward] }
            : kid
        )
      );
    } catch (error) {
      this.errorHandler.handleError(error);
    }
  }
}
