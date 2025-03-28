import { Component, inject, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { NotaFiscalRequest } from '@models/dto/requests/nota-fiscal-request.model'
import { FornecedorResponse } from '@models/dto/responses/fornecedor-reponse.model'
import { NotaFiscalResponse } from '@models/dto/responses/nota-fiscal-response.model'
import { FornecedorStore } from '@shared/stores/fornecedor.store'
import { NotaFiscalStore } from '@shared/stores/nota-fiscal.store'
import { ButtonModule } from 'primeng/button'
import { InputMaskModule } from 'primeng/inputmask'
import { InputNumberModule } from 'primeng/inputnumber'
import { InputTextModule } from 'primeng/inputtext'
import { RippleModule } from 'primeng/ripple'
import { SelectModule } from 'primeng/select'
import { TableModule } from 'primeng/table'
import { ToastModule } from 'primeng/toast'

@Component({
    selector: 'app-form-nota-fiscal',
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
    templateUrl: './form-nota-fiscal.component.html',
    styleUrl: './form-nota-fiscal.component.scss',
})
export class FormNotaFiscalComponent implements OnInit {
    form: FormGroup
    fb = inject(FormBuilder)
    notaFiscalStore = inject(NotaFiscalStore)
    fornecedorStore = inject(FornecedorStore)

    fornecedoresOption: any[] = []
    router = inject(Router)
    route = inject(ActivatedRoute)

    notaFiscal?: NotaFiscalResponse

    constructor() {
        this.form = this.fb.group({
            numeroNota: ['', Validators.required],
            total: [null, Validators.required],
            fornecedor: ['', Validators.required],
            email: ['', Validators.required],

            rua: ['', Validators.required],
            numero: [null, Validators.required],
            bairro: ['', Validators.required],
            cidade: ['', Validators.required],
            estado: ['', Validators.required],
            pais: ['', Validators.required],
            cep: ['', Validators.required],
        })
    }
    ngOnInit(): void {
        let fornecedores = this.route.snapshot.data['fornecedores'] as FornecedorResponse[]
        if (fornecedores) {
            this.fornecedoresOption = fornecedores.map((fornecedor) => ({ label: fornecedor.razaoSocial, value: fornecedor.id }))
        } else {
            this.fornecedorStore.getAllFornecedores().subscribe({
                next: (value) => {
                    this.fornecedoresOption = value.map((fornecedor) => ({ label: fornecedor.razaoSocial, value: fornecedor.id }))
                },
                error: (err) => {},
                complete: () => {},
            })
        }

        this.notaFiscal = this.route.snapshot.data['notaFiscal'] as NotaFiscalResponse
        if (this.notaFiscal) {
            this.form.patchValue(
                {
                    numeroNota: this.notaFiscal.numeroNota,
                    total: this.notaFiscal.total,
                    fornecedor: this.fornecedoresOption.find((option) => option.value === this.notaFiscal!.fornecedor.id),
                    rua: this.notaFiscal.endereco.rua,
                    numero: this.notaFiscal.endereco.numero,
                    bairro: this.notaFiscal.endereco.bairro,
                    cidade: this.notaFiscal.endereco.cidade,
                    estado: this.notaFiscal.endereco.estado,
                    pais: this.notaFiscal.endereco.pais,
                    cep: this.notaFiscal.endereco.cep,
                },
                { emitEvent: false }
            )
        }
    }

    cadastrar() {
        const data = this.form.getRawValue()
        const notaFicalRequest = {
            numeroNota: data.numeroNota,
            total: data.total,
            fornecedorId: data.fornecedor.value,
            endereco: {
                rua: data.rua,
                numero: data.numero,
                bairro: data.bairro,
                cidade: data.cidade,
                estado: data.estado,
                pais: data.pais,
                cep: data.cep,
            },
        } as NotaFiscalRequest

        this.notaFiscalStore.createNotaFiscal(notaFicalRequest).subscribe(() => {
            this.router.navigate(['/notas-fiscais'])
            console.log('Nota Fiscal cadastrada com sucesso')
        })
    }

    limpar() {
        this.form.reset()
    }

    voltar() {
        this.router.navigate(['/notas-fiscais'])
    }
}
