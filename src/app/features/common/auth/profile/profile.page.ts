import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { User } from '@supabase/supabase-js';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './profile.page.html',
})
export class ProfilePage implements OnInit {
  user: User | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  async ngOnInit() {
    const { data } = await this.authService.getSession();
    this.user = data.session?.user ?? null;
  }

  async logout() {
    await this.authService.signOut();
    this.router.navigateByUrl('/login');
  }
}
