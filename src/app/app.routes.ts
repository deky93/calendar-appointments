import { Routes } from '@angular/router';

export const routes: Routes = [
    {path: 'appointments-list', loadComponent: () => import('./appointments-list/appointments-list.component').then(mod => mod.AppointmentsListComponent)},
    { path: '', redirectTo: '/appointments-list', pathMatch: 'full' },
];
