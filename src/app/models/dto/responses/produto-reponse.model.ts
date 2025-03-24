import { SituacaoProdutoEnum } from "@models/enums/situacao-produto.enum";

export interface ProdutoResponse { 
	id: number;
	descricao: string;
	situacao: SituacaoProdutoEnum;
}