import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { authRoutes } from './features/common/auth/auth.routes';
import { settingsRoutes } from './features/common/settings/settings.routes';

export const routes: Routes = [
  ...authRoutes,
  ...settingsRoutes,
  {
    path: 'home',
    redirectTo: '',
    pathMatch: 'full',
  },
  {
    path: '',
    loadChildren: () =>
      import('./layout/tabs/tabs.routes').then((m) => m.routes),
    canActivate: [authGuard],
  },
  {
    path: 'add-kid',
    loadComponent: () =>
      import('./features/app-specific/add-kid/add-kid.page').then(
        (m) => m.AddKidPage
      ),
    canActivate: [authGuard],
  },
  {
    path: 'add-reward/:kidId',
    loadComponent: () =>
      import('./features/app-specific/add-reward/add-reward.page').then(
        (m) => m.AddRewardPage
      ),
    canActivate: [authGuard],
  },
  {
    path: 'manage-kids',
    loadComponent: () => import('./features/app-specific/manage-kids/manage-kids.page').then( m => m.ManageKidsPage)
  },
];
