import { Component, inject, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { ProdutoResponse } from '@models/dto/responses/produto-reponse.model'
import { SituacaoProdutoEnum } from '@models/enums/situacao-produto.enum'
import { AlertService } from '@shared/services/alert.service'
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
export class FormProdutoComponent implements OnInit {
    form: FormGroup
    fb = inject(FormBuilder)
    router = inject(Router)
    route = inject(ActivatedRoute)
    produtoStore = inject(ProdutoStore)
    alertService = inject(AlertService)

    produto?: ProdutoResponse

    mode: string = 'Cadastrar'
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

    ngOnInit(): void {
        this.produto = this.route.snapshot.data['produto'] as ProdutoResponse
        if (this.produto) {
            this.mode = 'Editar'
            this.form.patchValue(
                {
                    descricao: this.produto.descricao,
                    situacao: this.options.find((option) => option.value === this.produto!.situacao),
                },
                { emitEvent: false }
            )
        }
    }

    cadastrar() {
        const data = this.form.getRawValue()
        const produtoRequest = {
            descricao: data.descricao,
            situacao: SituacaoProdutoEnum[data.situacao.value as keyof typeof SituacaoProdutoEnum],
        } as ProdutoRequest
        this.produtoStore.createProduto(produtoRequest).subscribe({
            error: (err) => {
                this.alertService.showError(err.error.errors)
            },
            complete: () => {
                this.alertService.showSuccess('Produto cadastrado com sucesso')
                this.router.navigate(['/produtos'])
            },
        })
    }

    editar() {
        const data = this.form.getRawValue()
        const produtoRequest = {
            id: this.produto?.id,
            descricao: data.descricao,
            situacao: SituacaoProdutoEnum[data.situacao.value as keyof typeof SituacaoProdutoEnum],
        } as ProdutoRequest
        this.produtoStore.updateProduto(this.produto!.id, produtoRequest).subscribe({
            error: (err) => {
                this.alertService.showError(err.error.errors)
            },
            complete: () => {
                this.alertService.showSuccess('Produto editado com sucesso')
                this.router.navigate(['/produtos'])
            },
        })
    }

    limpar() {
        this.form.reset()
    }

    voltar() {
        this.router.navigate(['/produtos'])
    }
}
