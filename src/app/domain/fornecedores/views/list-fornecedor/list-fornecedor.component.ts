import { DatePipe } from '@angular/common'
import { Component, inject } from '@angular/core'
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { Router } from '@angular/router'
import { FornecedorResponse } from '@models/dto/responses/fornecedor-reponse.model'
import { SituacaoFornecedorEnum } from '@models/enums/situacao-fornecedor.enum'
import { AlertService } from '@shared/services/alert.service'
import { FornecedorStore } from '@shared/stores/fornecedor.store'
import { NgxMaskPipe } from 'ngx-mask'
import { ButtonModule } from 'primeng/button'
import { InputMaskModule } from 'primeng/inputmask'
import { InputNumberModule } from 'primeng/inputnumber'
import { InputTextModule } from 'primeng/inputtext'
import { RippleModule } from 'primeng/ripple'
import { SelectModule } from 'primeng/select'
import { TableModule } from 'primeng/table'
import { ToastModule } from 'primeng/toast'
import { FornecedorFilter } from './../../../../models/dto/filters/fornecedor-filter.model'

@Component({
    selector: 'app-list-fornecedor',
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
		InputMaskModule,
		NgxMaskPipe,
		DatePipe
    ],
    templateUrl: './list-fornecedor.component.html',
    styleUrl: './list-fornecedor.component.scss',
})
export class ListFornecedorComponent {
    fornecedorStore = inject(FornecedorStore)
    alertService = inject(AlertService)
    fb = inject(FormBuilder)
    router = inject(Router)
    fornecedores!: FornecedorResponse[]
    options: any[] = [
        { label: 'Ativo', value: SituacaoFornecedorEnum.ATIVO },
        { label: 'Baixado', value: SituacaoFornecedorEnum.BAIXADO },
        { label: 'Suspenso', value: SituacaoFornecedorEnum.SUSPENSO },
    ]

    form: FormGroup

    constructor() {
        this.form = this.fb.group({
            razaoSocial: [''],
            cnpj: [''],
            situacao: [''],
        })
    }

    ngOnInit(): void {
        this.fornecedorStore.getAllFornecedores().subscribe({
            next: (value) => {
                this.fornecedores = value
            },
            error: (err) => {},
            complete: () => {},
        })
    }

    editarFornecedor(fornecedor: FornecedorResponse) {
        this.router.navigate(['/fornecedores/form', fornecedor.id])
    }

    excluirFornecedor(fornecedor: FornecedorResponse) {
        this.fornecedorStore.deleteFornecedor(fornecedor.id).subscribe({
            complete: () => {
                this.pesquisar()
            },
            error: (err) => {
                this.alertService.showError(err.error.errors)
            },
        })
    }

    baixarFornecedor(fornecedor: FornecedorResponse) {
        this.fornecedorStore.baixarFornecedor(fornecedor.id).subscribe({
            complete: () => {
                this.pesquisar()
            },
            error: (err) => {
                this.alertService.showError(err.error.errors)
            },
        })
    }

    limpar() {
        this.form.reset()
        this.pesquisar()
    }

    pesquisar() {
        const data = this.form.getRawValue()
        console.log(data)
        let fornecedorFilter: FornecedorFilter = {
            cnpj: data.cnpj !== null && data.cnpj.trim() !== '' ? data.cnpj : '',
            razaoSocial: data.razaoSocial !== null && data.razaoSocial.trim() !== '' ? data.razaoSocial : '',
            situacao:
                data.situacao !== null && data.situacao !== ''
                    ? SituacaoFornecedorEnum[data.situacao.value as keyof typeof SituacaoFornecedorEnum].valueOf()
                    : '',
        }

        this.fornecedorStore.search(fornecedorFilter).subscribe({
            next: (value) => {
                this.fornecedores = value
            },
            error: (err) => {
                this.alertService.showError(err.error.errors)
            },
        })
    }
}
