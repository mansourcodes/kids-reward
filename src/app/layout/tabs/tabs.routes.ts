import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'kids-list',
        loadComponent: () =>
          import('../../features/app-specific/kids-list/kids-list.page').then(
            (m) => m.KidsListPage
          ),
      },

      {
        path: 'profile',
        loadComponent: () =>
          import('../../features/common/auth/profile/profile.page').then(
            (m) => m.ProfilePage
          ),
      },
      {
        path: '',
        redirectTo: '/tabs/kids-list',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/kids-list',
    pathMatch: 'full',
  },
];
