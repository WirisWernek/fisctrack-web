import { EnderecoRequest } from './endereco-request.model'

export interface NotaFiscalRequest {
    numeroNota: string
    total: number
    endereco: EnderecoRequest
    fornecedorId: number
}
