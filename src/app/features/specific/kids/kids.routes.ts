import { Routes } from '@angular/router';
import { authGuard } from 'src/app/core/guards/auth.guard';

export const kidsRoutes: Routes = [
  {
    path: 'kids',
    children: [
      {
        path: 'add-kid',
        loadComponent: () =>
          import('./pages/add-kid/add-kid.page').then((m) => m.AddKidPage),
        canActivate: [authGuard],
      },
      {
        path: 'add-reward/:kidId',
        loadComponent: () =>
          import('./pages/add-reward/add-reward.page').then(
            (m) => m.AddRewardPage
          ),
        canActivate: [authGuard],
      },
      {
        path: 'manage-kids',
        loadComponent: () =>
          import('./pages/manage-kids/manage-kids.page').then(
            (m) => m.ManageKidsPage
          ),
      },
    ],
  },
];
