import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { supabase } from './supabase.client';

interface KidProfile {
  name: string;
  profile_picture_file?: File;
}

@Injectable({
  providedIn: 'root',
})
export class KidsService {
  constructor(private authService: AuthService) {}

  async addKid(kid: KidProfile): Promise<void> {
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

    const { error } = await supabase.from('kids').insert({
      name: kid.name,
      profile_picture_url: imageUrl,
      user_id: user.id,
    });

    if (error) throw error;
  }

  async getKidsByUser(userId: string): Promise<any[]> {
    const { data, error } = await supabase
      .from('kids')
      .select('*')
      .eq('user_id', userId);

    if (error) {
      throw error;
    }

    return data || [];
  }
}
