import { Component, inject, OnInit } from '@angular/core'
import { ProdutoResponse } from '@models/dto/responses/produto-reponse.model'
import { ProdutoStore } from '@shared/stores/produto.store'
import { ButtonModule } from 'primeng/button'
import { RippleModule } from 'primeng/ripple'
import { TableModule } from 'primeng/table'
import { ToastModule } from 'primeng/toast'

@Component({
    selector: 'app-list-produto',
    imports: [ButtonModule, RippleModule, ToastModule, TableModule],
    templateUrl: './list-produto.component.html',
    styleUrl: './list-produto.component.scss',
    providers: [ProdutoStore],
})
export class ListProdutoComponent implements OnInit {
    produtoStore = inject(ProdutoStore)
    produtos!: ProdutoResponse[]

    ngOnInit(): void {
        this.produtoStore.getAllProdutos().subscribe({
            next: (value) => {
                this.produtos = value
            },
            error: (err) => {},
            complete: () => {},
        })
	}
	
	editarProduto(produto: ProdutoResponse) { 
		console.log(produto)
	}
}
