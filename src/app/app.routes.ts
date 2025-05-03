import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DisplayComponent } from './components/display/display.component';
import { AlarmComponent } from './components/alarm/alarm.component';
import { DatabaseComponent } from './components/database/database.component';

export const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'folder/inbox',
  //   pathMatch: 'full',
  // },
  {
    path: 'folder/:id',
    loadComponent: () =>
      import('./folder/folder.page').then((m) => m.FolderPage),
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'display',
    component: DisplayComponent
  },
  {
    path: 'alarm',
    component: AlarmComponent
  },
  {
    path: 'database',
    component: DatabaseComponent
  },
  // {
  //   path: 'login',
  //   loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage)
  // }
];
