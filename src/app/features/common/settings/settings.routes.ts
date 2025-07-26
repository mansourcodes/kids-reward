import { Routes } from '@angular/router';
import { authGuard } from 'src/app/core/guards/auth.guard';

export const settingsRoutes: Routes = [
  {
    path: 'settings',
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./dashboard/dashboard.page').then((m) => m.DashboardPage),
        canActivate: [authGuard],
      },
      {
        path: 'more',
        children: [
          {
            path: '',
            redirectTo: 'dashboard',
            pathMatch: 'full',
          },
          {
            path: 'dashboard',
            loadComponent: () =>
              import('./more/dashboard/dashboard.page').then(
                (m) => m.DashboardPage
              ),
            canActivate: [authGuard],
          },
          {
            path: 'delete-account',
            loadComponent: () =>
              import('./more/delete-account/delete-account.page').then(
                (m) => m.DeleteAccountPage
              ),
            canActivate: [authGuard],
          },
        ],
      },
    ],
  },
];
