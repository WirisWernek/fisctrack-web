import { inject } from '@angular/core'
import type { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router'
import { NotaFiscalResponse } from '@models/dto/responses/nota-fiscal-response.model'
import { NotaFiscalStore } from '@shared/stores/nota-fiscal.store'

export const notaFiscalResolver: ResolveFn<NotaFiscalResponse> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    return inject(NotaFiscalStore).getNotaFiscalById(+route.paramMap.get('notaFiscalId')!)
}
