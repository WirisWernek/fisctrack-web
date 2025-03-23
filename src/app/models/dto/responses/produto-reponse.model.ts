import { SituacaoProdutoEnum } from "@models/enums/situacao-produto.enum";

export interface ProdutoResponse { 
	codigo: string;
	descricao: string;
	situacao: SituacaoProdutoEnum;
}