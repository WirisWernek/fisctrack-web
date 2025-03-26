import { EnderecoResponse } from './endereco-response.model'
import { FornecedorResponse } from './fornecedor-reponse.model'

export interface NotaFiscalResponse {
    id: number
	numeroNota: string
	dataEmissao: Date
	total: number
	fornecedor: FornecedorResponse
	endereco: EnderecoResponse
}
