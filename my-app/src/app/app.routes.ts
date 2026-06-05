import { Routes } from '@angular/router';
import { Users } from '../users/users';
import { Home } from '../home/home';

export const routes: Routes = [
  {
    path: 'dashboard',
    component: Home,
  },
  {
    path: 'users',
    component: Users,
  },
];
