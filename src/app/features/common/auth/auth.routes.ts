import { Routes } from '@angular/router';
import { LoginPage } from './login/login.page';
import { SignupPage } from './signup/signup.page';
import { ProfilePage } from './profile/profile.page';

export const authRoutes: Routes = [
  {
    path: 'login',
    component: LoginPage,
  },
  {
    path: 'signup',
    component: SignupPage,
  },
  {
    path: 'profile',
    component: ProfilePage,
  },
];
