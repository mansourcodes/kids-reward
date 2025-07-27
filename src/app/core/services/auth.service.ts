import { Injectable } from '@angular/core';
import { supabase } from '../supabase/supabase.client';
import { App } from '@capacitor/app';
import { Browser } from '@capacitor/browser';

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

  onAuthStateChanged(callback: (session: any) => void) {
    return supabase.auth.onAuthStateChange((_event, session) => {
      callback(session);
    });
  }
}
