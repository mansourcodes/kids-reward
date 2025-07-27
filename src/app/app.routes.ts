import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { authRoutes } from './features/common/auth/auth.routes';
import { settingsRoutes } from './features/common/settings/settings.routes';
import { kidsRoutes } from './features/specific/kids/kids.routes';

export const routes: Routes = [
  ...authRoutes,
  ...settingsRoutes,
  ...kidsRoutes,
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
];
