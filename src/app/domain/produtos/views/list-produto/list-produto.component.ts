import { Component, inject, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ProdutoFilter } from '@models/dto/filters/produto-filter.model'
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
    imports: [
        ButtonModule,
        RippleModule,
        ToastModule,
        TableModule,
        FormsModule,
        ReactiveFormsModule,
        SelectModule,
        InputTextModule,
        InputNumberModule,
    ],
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

    form: FormGroup

    constructor() {
        this.form = this.fb.group({
            id: [''],
            descricao: [''],
            situacao: [''],
        })
    }

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

	limpar() { 
		this.form.reset()
		this.pesquisar()
	}
	
    pesquisar() {
		const data = this.form.getRawValue()
		console.log(data)
        let produtoFilter: ProdutoFilter = {
            id: data.id !== null && data.id.toString().trim() !== '' ? data.id : '',
            descricao: data.descricao !== null && data.descricao.trim() !== '' ? data.descricao : '',
            situacao: data.situacao !== null && data.situacao !== ''  ? SituacaoProdutoEnum[data.situacao.value as keyof typeof SituacaoProdutoEnum].valueOf() : '',
        }

        this.produtoStore.search(produtoFilter).subscribe({
            next: (value) => {
                this.produtos = value
            },
            error: (err) => {},
            complete: () => {},
        })
    }
}
