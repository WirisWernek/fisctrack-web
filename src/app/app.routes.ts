import { Routes } from '@angular/router'

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./core/layout/default/default.component').then((c) => c.DefaultComponent),
        loadChildren: () => import('./domain/domain.routes').then((r) => r.DOMAIN_ROUTES),
    },
    {
        path: '**',
        pathMatch: 'full',
        redirectTo: '',
    },
]
