import { ProdutoResponse } from './produto-reponse.model'

export interface NotaFiscalItemResponse {
    produto: ProdutoResponse
    quantidade: number
    valorUnitario: number
}
