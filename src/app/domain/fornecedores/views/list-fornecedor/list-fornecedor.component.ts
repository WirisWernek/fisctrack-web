import { Component, inject } from '@angular/core'
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { FornecedorResponse } from '@models/dto/responses/fornecedor-reponse.model'
import { SituacaoFornecedorEnum } from '@models/enums/situacao-fornecedor.enum'
import { FornecedorStore } from '@shared/stores/fornecedor.store'
import { ButtonModule } from 'primeng/button'
import { InputNumberModule } from 'primeng/inputnumber'
import { InputTextModule } from 'primeng/inputtext'
import { RippleModule } from 'primeng/ripple'
import { SelectModule } from 'primeng/select'
import { TableModule } from 'primeng/table'
import { ToastModule } from 'primeng/toast'

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
    ],
    templateUrl: './list-fornecedor.component.html',
    styleUrl: './list-fornecedor.component.scss',
})
export class ListFornecedorComponent {
    fornecedorStore = inject(FornecedorStore)
    fb = inject(FormBuilder)
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
        console.log(fornecedor)
    }

    limpar() {}
    pesquisar() {}
}
