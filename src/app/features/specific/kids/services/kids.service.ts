import { Injectable } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';
import { supabase } from '../../../../core/supabase/supabase.client';
import { Reward } from './reward.service';
import { User } from '@supabase/supabase-js';
import { StorageService } from '../../../../core/services/storage.service';

export interface Kid {
  id: string;
  name: string;
  profile_picture_url: string | null;
  user_id: string;
  rewards: Reward[];
}

interface KidProfile {
  name: string;
  profile_picture_file?: File;
}

@Injectable({
  providedIn: 'root',
})
export class KidsService {
  constructor(
    private authService: AuthService,
    private storageService: StorageService
  ) {}

  async addKid(kid: KidProfile): Promise<Kid> {
    const session = await this.authService.getSession();
    if (!session || !session.data || !session.data.session) {
      throw new Error('User not authenticated');
    }
    const user = session.data.session.user;

    let imageUrl: string | null = null;
    if (kid.profile_picture_file) {
      imageUrl = await this.storageService.uploadImage(
        kid.profile_picture_file,
        'kid-profiles',
        user.id
      );
    }

    const { data, error } = await supabase.from('kids').insert({
      name: kid.name,
      profile_picture_url: imageUrl,
      user_id: user.id,
    }).select(`
        *,
        rewards (*)
      `);

    if (error) throw error;

    if (!data || data.length === 0) throw new Error('Failed to create kid');

    return data[0] as Kid;
  }

  async getKidsByUser(userId: string): Promise<Kid[]> {
    const { data, error } = await supabase
      .from('kids')
      .select('*, rewards (*)')
      .eq('user_id', userId);

    if (error) {
      throw error;
    }

    return (data as Kid[]) || [];
  }

  async getKidById(kidId: string): Promise<Kid> {
    const { data, error } = await supabase
      .from('kids')
      .select('*')
      .eq('id', kidId)
      .single();

    if (error) throw error;
    return data as Kid;
  }

  async updateKid(kid: Kid, profile_picture_file?: File): Promise<Kid> {
    const session = await this.authService.getSession();
    if (!session || !session.data || !session.data.session) {
      throw new Error('User not authenticated');
    }
    const user = session.data.session.user;

    let imageUrl: string | null = null;
    if (profile_picture_file) {
      imageUrl = await this.storageService.uploadImage(
        profile_picture_file,
        'kid-profiles',
        user.id
      );
    }

    const { data, error } = await supabase
      .from('kids')
      .update({
        name: kid.name,
        profile_picture_url: imageUrl ?? kid.profile_picture_url,
      })
      .eq('id', kid.id)
      .select();

    if (error) throw error;

    if (!data || data.length === 0) throw new Error('Failed to create kid');

    return data[0] as Kid;
  }
}
