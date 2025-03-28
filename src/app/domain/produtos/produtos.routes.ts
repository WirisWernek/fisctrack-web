import { Routes } from '@angular/router'
import { produtoResolver } from '@shared/resolvers/produto.resolver'

export const PRODUTOS_ROUTES: Routes = [
    {
        path: 'list',
        loadComponent: () => import('./views/list-produto/list-produto.component').then((c) => c.ListProdutoComponent),
    },
    {
        path: 'form',
        loadComponent: () => import('./views/form-produto/form-produto.component').then((c) => c.FormProdutoComponent),
    },
    {
        path: 'form/:produtoId',
        loadComponent: () => import('./views/form-produto/form-produto.component').then((c) => c.FormProdutoComponent),
        resolve: {
            produto: produtoResolver,
        },
    },
    {
        path: '**',
        pathMatch: 'full',
        redirectTo: 'list',
    },
]
