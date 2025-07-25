import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { authRoutes } from './features/common/auth/auth.routes';

export const routes: Routes = [
  ...authRoutes,
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
