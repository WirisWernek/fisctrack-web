import { Routes } from "@angular/router";

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
		path: '**',
		pathMatch: 'full',
		redirectTo: 'list',
	}
]