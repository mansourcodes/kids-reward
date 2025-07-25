import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-signup',
  imports: [CommonModule, IonicModule, FormsModule],
  templateUrl: './signup.page.html',
})
export class SignupPage {
  email = '';
  password = '';
  loading = false;
  error = '';
  success = '';

  constructor(private authService: AuthService, private router: Router) {}

  async signup() {
    this.loading = true;
    this.error = '';
    this.success = '';

    const { error } = await this.authService.signUp(this.email, this.password);
    this.loading = false;

    if (error) {
      this.error = error.message;
    } else {
      this.success = 'Signup successful! Please check your email to confirm.';
      // Optionally redirect:
      // this.router.navigate(['/login']);
    }
  }
}
