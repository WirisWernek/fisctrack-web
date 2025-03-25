import { Component, inject } from '@angular/core'
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { FornecedorResponse } from '@models/dto/responses/fornecedor-reponse.model'
import { SituacaoFornecedorEnum } from '@models/enums/situacao-fornecedor.enum'
import { FornecedorStore } from '@shared/stores/fornecedor.store'
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
            error: (err) => {},
            complete: () => {},
        })
    }
}
