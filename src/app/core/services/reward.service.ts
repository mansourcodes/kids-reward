import { Injectable, signal } from '@angular/core';
import { supabase } from './supabase.client';
import { AuthService } from './auth.service';

export interface Reward {
  kid_id: string;
  emoji: string;
  is_good: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class RewardService {
  rewardAdded = signal<string>(''); // kid_id for which a reward was added

  constructor(private authService: AuthService) {}

  async addReward(reward: Reward): Promise<void> {
    const session = await this.authService.getSession();
    if (!session?.data?.session?.user) {
      throw new Error('User not authenticated');
    }

    const { error } = await supabase.from('rewards').insert({
      ...reward,
      user_id: session.data.session.user.id,
    });

    if (error) throw error;

    // Update signal to notify listeners
    this.rewardAdded.set(reward.kid_id);
  }

  async getRewardsByKid(kidId: string): Promise<any[]> {
    const { data, error } = await supabase
      .from('rewards')
      .select('*')
      .eq('kid_id', kidId)
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    return data || [];
  }
}
