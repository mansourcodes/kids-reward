import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: '',
        redirectTo: 'kids-list',
        pathMatch: 'full',
      },
      {
        path: 'kids-list',
        loadComponent: () =>
          import(
            '../../features/specific/kids/pages/kids-list/kids-list.page'
          ).then((m) => m.KidsListPage),
      },

      {
        path: 'profile',
        loadComponent: () =>
          import('../../features/common/auth/profile/profile.page').then(
            (m) => m.ProfilePage
          ),
      },
      {
        path: 'settings',
        loadComponent: () =>
          import(
            '../../features/common/settings/dashboard/dashboard.page'
          ).then((m) => m.DashboardPage),
      },
    ],
  },
  {
    path: '',
    redirectTo: 'tabs',
    pathMatch: 'full',
  },
];
