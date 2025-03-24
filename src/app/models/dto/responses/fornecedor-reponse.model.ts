import { SituacaoFornecedorEnum } from "@models/enums/situacao-fornecedor.enum";

export interface FornecedorResponse { 
	id: number;
	razaoSocial: string;
	cnpj: string;
	email: string;
	telefone: string;
	dataBaixa: Date;
	situacao: SituacaoFornecedorEnum;
}