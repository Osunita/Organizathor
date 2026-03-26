import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'auth', loadChildren: () => import('./auth/auth.routes').then(m => m.authRoutes) },
  { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.routes').then(m => m.dashboardRoutes), canActivate: [authGuard] },
  { path: 'tasks', loadChildren: () => import('./tasks/tasks.routes').then(m => m.tasksRoutes), canActivate: [authGuard] },
  { path: 'notes', loadChildren: () => import('./notes/notes.routes').then(m => m.notesRoutes), canActivate: [authGuard] },
  { path: '**', redirectTo: 'dashboard' }
];
