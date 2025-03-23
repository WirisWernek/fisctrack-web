import { Routes } from '@angular/router'

export const DOMAIN_ROUTES: Routes = [
    {
        path: 'produtos',
        loadChildren: () => import('./produtos/produtos.routes').then((r) => r.PRODUTOS_ROUTES),
	},
	{
		path: '**',
		pathMatch: 'full',
		redirectTo: 'produtos',
	}
]
