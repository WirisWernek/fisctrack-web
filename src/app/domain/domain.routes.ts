import { Routes } from '@angular/router'

export const DOMAIN_ROUTES: Routes = [
    {
        path: 'produtos',
        loadChildren: () => import('./produtos/produtos.routes').then((r) => r.PRODUTOS_ROUTES),
    },
    {
        path: 'fornecedores',
        loadChildren: () => import('./fornecedores/fornecedores.routes').then((r) => r.FORNECEDOR_ROUTES),
    },
    {
        path: 'notas-fiscais',
        loadChildren: () => import('./nota-fiscal/nota-fiscal.routes').then((r) => r.NOTA_FISCAL_ROUTES),
    },
    {
        path: '**',
        pathMatch: 'full',
        redirectTo: 'produtos',
    },
]
