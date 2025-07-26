import { inject, signal } from '@angular/core';
import { Kid, KidsService } from './services/kids.service';
import { RewardService, Reward } from './services/reward.service';
import { AuthService } from './services/auth.service';

const kidsService = inject(KidsService);
const rewardService = inject(RewardService);
const authService = inject(AuthService);

export const kidsSignal = signal<Kid[]>([]);

export const kidsStore = {
  kids: kidsSignal.asReadonly(),

  async loadKids() {
    try {
      const session = await authService.getSession();
      if (!session?.data?.session?.user) return;

      const user = session.data.session.user;
      const kids = await kidsService.getKidsByUser(user.id);
      kidsSignal.set(kids);
    } catch (error) {
      console.error('Error loading kids:', error);
    }
  },

  async addKid(kid: { name: string; profile_picture_file?: File }) {
    try {
      const newKid = await kidsService.addKid(kid);
      kidsSignal.update((kids) => [...kids, newKid]);
    } catch (error) {
      console.error('Error adding kid:', error);
    }
  },

  async addReward(reward: Omit<Reward, 'id' | 'user_id' | 'created_at'>) {
    try {
      const newReward = await rewardService.addReward(reward);
      kidsSignal.update((kids) =>
        kids.map((kid) =>
          kid.id === reward.kid_id
            ? { ...kid, rewards: [...kid.rewards, newReward] }
            : kid
        )
      );
    } catch (error) {
      console.error('Error adding reward:', error);
    }
  },
};
