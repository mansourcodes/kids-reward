import { Routes } from '@angular/router';
import { LoginPage } from './login/login.page';
import { SignupPage } from './signup/signup.page';

export const authRoutes: Routes = [
  {
    path: 'login',
    component: LoginPage,
  },
  {
    path: 'signup',
    component: SignupPage,
  },
];
