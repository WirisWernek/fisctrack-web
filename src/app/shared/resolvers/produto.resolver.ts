import { inject } from '@angular/core'
import type { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router'
import { ProdutoResponse } from '@models/dto/responses/produto-reponse.model'
import { ProdutoStore } from '@shared/stores/produto.store'

export const produtoResolver: ResolveFn<ProdutoResponse> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    return inject(ProdutoStore).getProdutoById(+route.paramMap.get('produtoId')!)
}
