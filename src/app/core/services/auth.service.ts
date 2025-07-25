import { Injectable } from '@angular/core';
import { supabase } from './supabase.client';
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
        redirectTo: 'com.mansourcodes.kidsreward://login-callback',
      },
    });
  }

  async signInWithGoogle() {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'com.mansourcodes.kidsreward://login-callback', // Must match Info.plist
      },
    });

    // Open Supabase OAuth in system browser
    await Browser.open({
      url: 'https://your-supabase-url.com/auth/v1/authorize?...',
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
