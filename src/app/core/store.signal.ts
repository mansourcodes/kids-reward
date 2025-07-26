import { signal } from '@angular/core';
import { supabase } from './services/supabase.client';
import { AuthService } from './services/auth.service';

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
  created_at?: string; // Made optional
}

interface store {
  kids: Kid[];
}

const storeSignal = signal<store>({ kids: [] });

export const kidsStore = {
  store: storeSignal.asReadonly(),

  async loadKids() {
    const authService = new AuthService();
    const session = await authService.getSession();
    if (!session?.data?.session?.user) return;

    const user = session.data.session.user;

    // Fetch kids with their rewards
    const { data, error } = await supabase
      .from('kids')
      .select(
        `
        *,
        rewards (*)
      `
      )
      .eq('user_id', user.id);

    if (error) {
      console.error('Error loading kids:', error);
      return;
    }

    storeSignal.set({ kids: data as Kid[] });
  },

  async addKid(
    kid: Omit<Kid, 'id' | 'rewards' | 'user_id' | 'profile_picture_url'> & {
      profile_picture_file?: File;
    }
  ) {
    const authService = new AuthService();
    const session = await authService.getSession();
    if (!session?.data?.session?.user) return;

    const user = session.data.session.user;

    let imageUrl: string | null = null;

    if (kid.profile_picture_file) {
      const fileExt = kid.profile_picture_file.name.split('.').pop();
      const fileName = `${user.id}/${Math.random()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('kid-profiles')
        .upload(`${fileName}`, kid.profile_picture_file, {
          cacheControl: '3600',
        });

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from('kid-profiles')
        .getPublicUrl(`${fileName}`);

      imageUrl = urlData?.publicUrl ?? null;
    }

    const { data, error } = await supabase.from('kids').insert({
      name: kid.name,
      profile_picture_url: imageUrl,
      user_id: user.id,
    }).select(`
        *,
        rewards (*)
      `);

    if (error) {
      console.error('Error adding kid:', error);
      return;
    }

    if (data && data.length > 0) {
      storeSignal.update((store) => {
        return {
          ...store,
          kids: [data[0] as Kid],
        };
      });
    }
  },

  async addReward(reward: Omit<Reward, 'id' | 'user_id' | 'created_at'>) {
    const authService = new AuthService();
    const session = await authService.getSession();
    if (!session?.data?.session?.user) return;

    const user = session.data.session.user;

    const { data, error } = await supabase
      .from('rewards')
      .insert({
        ...reward,
        user_id: user.id,
      })
      .select();

    if (error) {
      console.error('Error adding reward:', error);
      return;
    }

    if (data && data.length > 0) {
      const newReward = data[0] as Reward;
      storeSignal.update((store) => {
        const updatedStore = store.kids.map((kid) =>
          kid.id === reward.kid_id
            ? { ...kid, rewards: [...kid.rewards, newReward] }
            : kid
        );

        return {
          ...store,
          ...updatedStore,
        };
      });
    }
  },
};
