import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DisplayComponent } from './components/display/display.component';
import { AlarmComponent } from './components/alarm/alarm.component';
import { DatabaseComponent } from './components/database/database.component';
import { AuthGuard } from './guards/auth.guard';
import { NotFoundComponent } from './components/not-found/not-found.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/auth/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'creds',
    loadComponent: () => import('./pages/auth/creds/creds.page').then( m => m.CredsPage)
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'display',
    component: DisplayComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'alarm',
    component: AlarmComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'database',
    component: DatabaseComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    component: NotFoundComponent
  },
  {
    path: 'creds',
    loadComponent: () => import('./pages/auth/creds/creds.page').then( m => m.CredsPage)
  }
];
