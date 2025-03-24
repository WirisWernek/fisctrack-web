import { Component, inject, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ProdutoResponse } from '@models/dto/responses/produto-reponse.model'
import { SituacaoProdutoEnum } from '@models/enums/situacao-produto.enum'
import { ProdutoStore } from '@shared/stores/produto.store'
import { ButtonModule } from 'primeng/button'
import { InputNumberModule } from 'primeng/inputnumber'
import { InputTextModule } from 'primeng/inputtext'
import { RippleModule } from 'primeng/ripple'
import { SelectModule } from 'primeng/select'
import { TableModule } from 'primeng/table'
import { ToastModule } from 'primeng/toast'

@Component({
	selector: 'app-list-produto',
	imports: [ButtonModule, RippleModule, ToastModule, TableModule, FormsModule, ReactiveFormsModule, SelectModule, InputTextModule, InputNumberModule],
	templateUrl: './list-produto.component.html',
	styleUrl: './list-produto.component.scss',
	providers: [ProdutoStore],
})
export class ListProdutoComponent implements OnInit {
	produtoStore = inject(ProdutoStore)
	fb = inject(FormBuilder)
	produtos!: ProdutoResponse[]
	options: any[] = [
		{ label: 'Ativo', value: SituacaoProdutoEnum.ATIVO },
		{ label: 'Inativo', value: SituacaoProdutoEnum.INATIVO },
	]

	form: FormGroup;

	constructor() {
		this.form = this.fb.group({
			id: [null],
			descricao: [''],
			situacao: [''],
		})
	}

	ngOnInit(): void {
		this.produtoStore.getAllProdutos().subscribe({
			next: (value) => {
				this.produtos = value
			},
			error: (err) => { },
			complete: () => { },
		})
	}

	editarProduto(produto: ProdutoResponse) {
		console.log(produto)
	}

	limpar() { }
	pesquisar() { }
}
