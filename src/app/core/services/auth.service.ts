import { Injectable } from '@angular/core';
import { supabase } from './supabase.client';

@Injectable({ providedIn: 'root' })
export class AuthService {
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
