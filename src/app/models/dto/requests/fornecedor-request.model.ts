import { SituacaoFornecedorEnum } from '@models/enums/situacao-fornecedor.enum'

export interface FornecedorRequest {
    razaoSocial: string
    cnpj: string
    email: string
    telefone: string
    situacao: SituacaoFornecedorEnum
}
