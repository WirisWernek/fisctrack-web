import { Component, inject } from '@angular/core'
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { SituacaoProdutoEnum } from '@models/enums/situacao-produto.enum'
import { ProdutoStore } from '@shared/stores/produto.store'
import { ButtonModule } from 'primeng/button'
import { InputTextModule } from 'primeng/inputtext'
import { SelectModule } from 'primeng/select'
import { ProdutoRequest } from './../../../../models/dto/requests/produto-request.model'

@Component({
    selector: 'app-form-produto',
    imports: [FormsModule, ReactiveFormsModule, SelectModule, InputTextModule, ButtonModule],
    templateUrl: './form-produto.component.html',
    styleUrl: './form-produto.component.scss',
})
export class FormProdutoComponent {
    form: FormGroup
    fb = inject(FormBuilder)
    router = inject(Router)

    produtoStore = inject(ProdutoStore)

    options: any[] = [
        { label: 'Ativo', value: SituacaoProdutoEnum.ATIVO },
        { label: 'Inativo', value: SituacaoProdutoEnum.INATIVO },
    ]

    constructor() {
        this.form = this.fb.group({
            descricao: ['', Validators.required],
            situacao: ['', Validators.required],
        })
    }

    cadastrar() {
        const data = this.form.getRawValue()
        const produtoRequest = {
            descricao: data.descricao,
            situacao: SituacaoProdutoEnum[data.situacao.value as keyof typeof SituacaoProdutoEnum],
        } as ProdutoRequest
        this.produtoStore.createProduto(produtoRequest).subscribe(() => {
            this.router.navigate(['/produtos'])
            console.log('Produto cadastrado com sucesso')
        })
    }
}
