import { Routes } from '@angular/router';
import { authGuard } from 'src/app/core/guards/auth.guard';

export const kidsRoutes: Routes = [
  {
    path: 'kids',
    children: [
      {
        path: 'kid-form',
        loadComponent: () =>
          import('./pages/kid-form/kid-form.page').then((m) => m.KidFormPage),
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
        path: 'kids-manage',
        loadComponent: () =>
          import('./pages/kids-manage/kids-manage.page').then(
            (m) => m.KidsManagePage
          ),
      },
    ],
  },
];
