import { Injectable, signal } from '@angular/core';
import { supabase } from '../../../../core/supabase/supabase.client';
import { AuthService } from '../../../../core/services/auth.service';

export interface Reward {
  id: string;
  kid_id: string;
  emoji: string;
  is_good: boolean;
  user_id: string;
  created_at: string;
}

@Injectable({
  providedIn: 'root',
})
export class RewardService {
  constructor(private authService: AuthService) {}

  async addReward(
    reward: Omit<Reward, 'id' | 'user_id' | 'created_at'>
  ): Promise<Reward> {
    const session = await this.authService.getSession();
    if (!session?.data?.session?.user) {
      throw new Error('User not authenticated');
    }
    const user = session.data.session.user;

    const { data, error } = await supabase
      .from('rewards')
      .insert({
        ...reward,
        user_id: user.id,
      })
      .select();

    if (error) throw error;

    if (!data || data.length === 0) throw new Error('Failed to create reward');

    return data[0] as Reward;
  }

  async getRewardsByKid(kidId: string): Promise<Reward[]> {
    const { data, error } = await supabase
      .from('rewards')
      .select('*')
      .eq('kid_id', kidId)
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    return (data as Reward[]) || [];
  }
}
