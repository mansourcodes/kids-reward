import { Routes } from '@angular/router';
import { authGuard } from 'src/app/core/guards/auth.guard';

export const authRoutes: Routes = [
  {
    path: 'auth',
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      {
        path: 'login',
        loadComponent: () =>
          import('./login/login.page').then((m) => m.LoginPage),
      },
      {
        path: 'signup',
        loadComponent: () =>
          import('./signup/signup.page').then((m) => m.SignupPage),
      },
      {
        path: 'otp-verification',
        loadComponent: () =>
          import('./otp-verification/otp-verification.page').then(
            (m) => m.OtpVerificationPage
          ),
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('./profile/profile.page').then((m) => m.ProfilePage),
        canActivate: [authGuard],
      },
    ],
  },
];
