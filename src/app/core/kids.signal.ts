import { signal } from '@angular/core';

export interface Kid {
  id: string;
  name: string;
  profile_picture_url: string | null;
  user_id: string;
  rewards: Reward[];
}

export interface Reward {
  id: string;
  kid_id: string;
  emoji: string;
  is_good: boolean;
  user_id: string;
  created_at: string;
}

export const kidsSignal = signal<Kid[]>([]);
