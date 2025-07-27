import { Injectable } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';
import { supabase } from '../../../../core/supabase/supabase.client';
import { Reward } from './reward.service';

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
  constructor(private authService: AuthService) {}

  async addKid(kid: KidProfile): Promise<Kid> {
    const session = await this.authService.getSession();
    if (!session || !session.data || !session.data.session) {
      throw new Error('User not authenticated');
    }
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

  async updateKid(kid: Kid): Promise<void> {
    const { error } = await supabase
      .from('kids')
      .update({
        name: kid.name,
        profile_picture_url: kid.profile_picture_url,
      })
      .eq('id', kid.id);

    if (error) throw error;
  }
}
