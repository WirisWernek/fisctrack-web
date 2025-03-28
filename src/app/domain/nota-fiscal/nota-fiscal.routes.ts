import { Routes } from '@angular/router'
import { getAllfornecedoresResolver } from '@shared/resolvers/fornecedor.resolver'

import { notaFiscalResolver } from '@shared/resolvers/nota-fiscal.resolver'

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
        path: 'form/:notaFiscalId',
        loadComponent: () => import('./views/form-nota-fiscal/form-nota-fiscal.component').then((c) => c.FormNotaFiscalComponent),
        resolve: {
            notaFiscal: notaFiscalResolver,
            fornecedores: getAllfornecedoresResolver,
        },
    },
    {
        path: '**',
        pathMatch: 'full',
        redirectTo: 'list',
    },
]
