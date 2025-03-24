import { SituacaoProdutoEnum } from "@models/enums/situacao-produto.enum";

export interface ProdutoResponse { 
	id: string;
	descricao: string;
	situacao: SituacaoProdutoEnum;
}