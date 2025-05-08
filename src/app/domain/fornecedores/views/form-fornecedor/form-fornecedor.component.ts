import { Component, inject, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { FornecedorRequest } from '@models/dto/requests/fornecedor-request.model'
import { FornecedorResponse } from '@models/dto/responses/fornecedor-reponse.model'
import { SituacaoFornecedorEnum } from '@models/enums/situacao-fornecedor.enum'
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
export class FormFornecedorComponent implements OnInit {
    form: FormGroup
    fb = inject(FormBuilder)
    fornecedorStore = inject(FornecedorStore)
    router = inject(Router)
    route = inject(ActivatedRoute)

    fornecedor?: FornecedorResponse

    options: any[] = [
        { label: 'Ativo', value: SituacaoFornecedorEnum.ATIVO },
        { label: 'Suspenso', value: SituacaoFornecedorEnum.SUSPENSO },
        { label: 'Baixado', value: SituacaoFornecedorEnum.BAIXADO },
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

    ngOnInit(): void {
        this.fornecedor = this.route.snapshot.data['fornecedor'] as FornecedorResponse
        if (this.fornecedor) {
            this.form.patchValue(
                {
                    razaoSocial: this.fornecedor.razaoSocial,
                    cnpj: this.fornecedor.cnpj,
                    telefone: this.fornecedor.telefone,
                    email: this.fornecedor.email,
                    situacao: this.options.find((option) => option.value === this.fornecedor!.situacao),
                },
                { emitEvent: false }
            )
        }
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

    editar() {
        const data = this.form.getRawValue()
        const fornecedorRequest = {
            id: this.fornecedor?.id,
            razaoSocial: data.razaoSocial,
            cnpj: data.cnpj,
            telefone: data.telefone,
            email: data.email,
            situacao: SituacaoFornecedorEnum[data.situacao.value as keyof typeof SituacaoFornecedorEnum],
        } as FornecedorRequest

        this.fornecedorStore.updateFornecedor(this.fornecedor!.id, fornecedorRequest).subscribe(() => {
            this.router.navigate(['/fornecedores'])
            console.log('Fornecedor editado com sucesso')
        })
    }

    limpar() {
        this.form.reset()
    }

    voltar() {
        this.router.navigate(['/fornecedores'])
    }
}
