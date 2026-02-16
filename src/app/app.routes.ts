import { Routes } from '@angular/router';
import { IdxResolver, ReportResolver } from './core/resolver';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./template/template').then((m) => m.Template),
    children: [
      {
        path: '',
        title: 'Complexity Report - Viewer',
        loadComponent: () => import('./features/viewer/viewer').then((m) => m.Viewer),
        resolve: {
          done: ReportResolver,
        },
      },
      {
        path: 'details/:idx',
        title: 'Complexity Report - Details',
        loadComponent: () => import('./features/details/details').then((m) => m.Details),
        resolve: {
          idx: IdxResolver,
        },
      },
    ],
  },
];
