import { Routes } from '@angular/router'

export const NOTA_FISCAL_ROUTES: Routes = [
    {
        path: 'list',
        loadComponent: () => import('./views/list-nota-fiscal/list-nota-fiscal.component').then((c) => c.ListNotaFiscalComponent),
    },
    {
        path: 'form',
        loadComponent: () => import('./views/form-nota-fiscal/form-nota-fiscal.component').then((c) => c.FormNotaFiscalComponent),
    },
    {
        path: '**',
        pathMatch: 'full',
        redirectTo: 'list',
    },
]
