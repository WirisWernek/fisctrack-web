import { inject } from '@angular/core'
import type { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router'
import { FornecedorResponse } from '@models/dto/responses/fornecedor-reponse.model'
import { FornecedorStore } from '@shared/stores/fornecedor.store'

export const getFornecedorByIdResolver: ResolveFn<FornecedorResponse> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    return inject(FornecedorStore).getFornecedorById(+route.paramMap.get('fornecedorId')!)
}

export const getAllfornecedoresResolver: ResolveFn<FornecedorResponse[]> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    return inject(FornecedorStore).getAllFornecedores()
}
