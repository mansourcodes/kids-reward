import { Injectable } from '@angular/core';
import { supabase } from '../supabase/supabase.client';
import { App } from '@capacitor/app';
import { Browser } from '@capacitor/browser';
import { User, UserResponse } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  //

  constructor() {
    App.addListener('appUrlOpen', async (event) => {
      if (
        event.url &&
        event.url.startsWith('com.mansourcodes.kidsreward://login-callback')
      ) {
        // Required to complete OAuth flow
        await supabase.auth.getSession();
      }
    });
  }

  async signInWithApple() {
    await supabase.auth.signInWithOAuth({
      provider: 'apple',
      options: {
        redirectTo: 'https://rxewsqitjlqnghfghbvi.supabase.co/auth/v1/callback',
      },
    });
  }

  signUp(email: string, password: string) {
    return supabase.auth.signUp({ email, password });
  }

  signIn(email: string, password: string) {
    return supabase.auth.signInWithPassword({ email, password });
  }

  signOut() {
    return supabase.auth.signOut();
  }

  getSession() {
    return supabase.auth.getSession();
  }

  async getUser() {
    const { data: userData } = await supabase.auth.getUser();
    return userData.user ?? null;
  }

  onAuthStateChanged(callback: (session: any) => void) {
    return supabase.auth.onAuthStateChange((_event, session) => {
      callback(session);
    });
  }

  async sendOtp(email: string) {
    return await supabase.auth.signInWithOtp({
      email: email,
      options: {
        shouldCreateUser: false,
      },
    });
  }

  async resetPassword(new_password: string) {
    return await supabase.auth.updateUser({
      password: new_password,
    });
  }

  async verifyOtp(email: string, otp: string) {
    return await supabase.auth.verifyOtp({
      email: email,
      token: otp,
      type: 'email',
    });
  }

  async deleteAccount(user: User) {
    // Delete from storage
    const { data: files } = await supabase.storage
      .from('kids-profiles')
      .list(`${user.id}`);
    const filePaths = files?.map((file) => `${user.id}/${file.name}`) ?? [];
    if (filePaths.length !== 0) {
      await supabase.storage.from('kids-profiles').remove(filePaths);
    }
    // Delete from related tables
    await supabase.from('rewards').delete().eq('user_id', user.id);
    await supabase.from('kids').delete().eq('user_id', user.id);

    // Delete user
    const session = await this.getSession();
    if (!session || !session.data || !session.data.session) {
      throw new Error('User not authenticated');
    }

    const { data, error } = await supabase.functions.invoke('delete-user', {
      body: { userId: user.id },
    });

    if (error) throw error;

    return {
      state: 'success',
      error: null,
    };
  }
}
