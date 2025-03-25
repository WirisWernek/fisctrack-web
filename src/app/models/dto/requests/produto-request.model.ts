import { SituacaoProdutoEnum } from "@models/enums/situacao-produto.enum";

export interface ProdutoRequest { 
	descricao: string;
	situacao: SituacaoProdutoEnum;
}