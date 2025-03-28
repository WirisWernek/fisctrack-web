import { Routes } from '@angular/router'
import { getFornecedorByIdResolver } from '@shared/resolvers/fornecedor.resolver'

export const FORNECEDOR_ROUTES: Routes = [
    {
        path: 'list',
        loadComponent: () => import('./views/list-fornecedor/list-fornecedor.component').then((c) => c.ListFornecedorComponent),
    },
    {
        path: 'form',
        loadComponent: () => import('./views/form-fornecedor/form-fornecedor.component').then((c) => c.FormFornecedorComponent),
    },
    {
        path: 'form/:fornecedorId',
        loadComponent: () => import('./views/form-fornecedor/form-fornecedor.component').then((c) => c.FormFornecedorComponent),
        resolve: {
            fornecedor: getFornecedorByIdResolver,
        },
    },
    {
        path: '**',
        pathMatch: 'full',
        redirectTo: 'list',
    },
]
