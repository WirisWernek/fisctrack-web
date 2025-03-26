import { DatePipe, registerLocaleData } from '@angular/common'
import { Component, inject } from '@angular/core'
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NotaFiscalFilter } from '@models/dto/filters/nota-fiscal-filter.model'
import { NotaFiscalStore } from '@shared/stores/nota-fiscal.store'
import { ButtonModule } from 'primeng/button'
import { DatePickerModule } from 'primeng/datepicker'
import { InputMaskModule } from 'primeng/inputmask'
import { InputNumberModule } from 'primeng/inputnumber'
import { InputTextModule } from 'primeng/inputtext'
import { RippleModule } from 'primeng/ripple'
import { SelectModule } from 'primeng/select'
import { TableModule } from 'primeng/table'
import { ToastModule } from 'primeng/toast'
import { NotaFiscalResponse } from './../../../../models/dto/responses/nota-fiscal-response.model'
import { FornecedorStore } from './../../../../shared/stores/fornecedor.store'

import localePt from '@angular/common/locales/pt'

registerLocaleData(localePt)

@Component({
    selector: 'app-list-nota-fiscal',
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
        DatePickerModule,
        DatePipe,
    ],
    templateUrl: './list-nota-fiscal.component.html',
    styleUrl: './list-nota-fiscal.component.scss',
})
export class ListNotaFiscalComponent {
    notaFiscaltore = inject(NotaFiscalStore)
    fornecedorStore = inject(FornecedorStore)
    fb = inject(FormBuilder)
    notasFiscais!: NotaFiscalResponse[]
    fornecedoresOption: any[] = []

    form: FormGroup

    constructor() {
        this.form = this.fb.group({
            numeroNota: [''],
            fornecedor: [''],
            dataEmissaoInicio: [''],
            dataEmissaoFim: [''],
        })
    }

    ngOnInit(): void {
        this.fornecedorStore.getAllFornecedores().subscribe({
            next: (value) => {
                this.fornecedoresOption = value.map((f) => {
                    return { label: f.razaoSocial, value: f.id }
                })
            },
            error: (err) => {},
            complete: () => {},
        })

        this.pesquisar()
    }

    editarFornecedor(notaFiscal: NotaFiscalResponse) {
        console.log(notaFiscal)
    }

    limpar() {
        this.form.reset()
        this.pesquisar()
    }

    pesquisar() {
        const data = this.form.getRawValue()
        console.log(data)
        let notaFiscalFilter: NotaFiscalFilter = {
            numeroNota: data.numeroNota !== null && data.numeroNota.trim() !== '' ? data.numeroNota : '',
            fornecedorId: data.fornecedor !== null && data.fornecedor !== '' ? data.fornecedor.value : '',
            dataEmissaoInicio: data.dataEmissaoInicio !== null && data.dataEmissaoInicio !== '' ? this.formatarData(data.dataEmissaoInicio) : '',
            dataEmissaoFim: data.dataEmissaoFim !== null && data.dataEmissaoFim !== '' ? this.formatarData(data.dataEmissaoFim) : '',
        }

        this.notaFiscaltore.search(notaFiscalFilter).subscribe({
            next: (value) => {
                this.notasFiscais = value
            },
            error: (err) => {},
            complete: () => {},
        })
    }

    private formatarData(data: string): string {
        return new DatePipe('pt-br').transform(new Date(data), 'yyyy-MM-dd')?.toString() || ''
    }
}
