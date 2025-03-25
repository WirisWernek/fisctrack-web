import { Component, inject } from '@angular/core'
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { FornecedorRequest } from '@models/dto/requests/fornecedor-request.model'
import { SituacaoFornecedorEnum } from '@models/enums/situacao-fornecedor.enum'
import { SituacaoProdutoEnum } from '@models/enums/situacao-produto.enum'
import { FornecedorStore } from '@shared/stores/fornecedor.store'
import { ButtonModule } from 'primeng/button'
import { InputMaskModule } from 'primeng/inputmask'
import { InputTextModule } from 'primeng/inputtext'
import { SelectModule } from 'primeng/select'

@Component({
    selector: 'app-form-fornecedor',
    imports: [FormsModule, ReactiveFormsModule, SelectModule, InputTextModule, ButtonModule, InputMaskModule],
    templateUrl: './form-fornecedor.component.html',
    styleUrl: './form-fornecedor.component.scss',
})
export class FormFornecedorComponent {
    form: FormGroup
    fb = inject(FormBuilder)
    fornecedorStore = inject(FornecedorStore)
    router = inject(Router)

    options: any[] = [
        { label: 'Ativo', value: SituacaoProdutoEnum.ATIVO },
        { label: 'Inativo', value: SituacaoProdutoEnum.INATIVO },
    ]

    constructor() {
        this.form = this.fb.group({
            razaoSocial: ['', Validators.required],
            cnpj: ['', Validators.required],
            telefone: ['', Validators.required],
            email: ['', Validators.required],
            situacao: ['', Validators.required],
        })
    }

    cadastrar() {
        const data = this.form.getRawValue()
        const fornecedorRequest = {
            razaoSocial: data.razaoSocial,
            cnpj: data.cnpj,
            telefone: data.telefone,
            email: data.email,
            situacao: SituacaoFornecedorEnum[data.situacao.value as keyof typeof SituacaoFornecedorEnum],
        } as FornecedorRequest

        this.fornecedorStore.createFornecedor(fornecedorRequest).subscribe(() => {
            this.router.navigate(['/fornecedores'])
            console.log('Fornecedor cadastrado com sucesso')
        })
    }
}
