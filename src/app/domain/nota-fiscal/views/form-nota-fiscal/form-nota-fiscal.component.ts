import { Component, inject, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { NotaFiscalItemRequest } from '@models/dto/requests/nota-fiscal-item-request.model'
import { NotaFiscalRequest } from '@models/dto/requests/nota-fiscal-request.model'
import { FornecedorResponse } from '@models/dto/responses/fornecedor-reponse.model'
import { NotaFiscalResponse } from '@models/dto/responses/nota-fiscal-response.model'
import { ProdutoResponse } from '@models/dto/responses/produto-reponse.model'
import { AlertService } from '@shared/services/alert.service'
import { FornecedorStore } from '@shared/stores/fornecedor.store'
import { NotaFiscalStore } from '@shared/stores/nota-fiscal.store'
import { ProdutoStore } from '@shared/stores/produto.store'
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
    formItems: FormGroup
    fb = inject(FormBuilder)
    notaFiscalStore = inject(NotaFiscalStore)
    fornecedorStore = inject(FornecedorStore)
    produtoStore = inject(ProdutoStore)
    alertService = inject(AlertService)

    fornecedoresOption: any[] = []
    produtosOption: any[] = []
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
            itens: [[], Validators.required],
        })

        this.formItems = this.fb.group({
            produto: [null],
            quantidade: [null],
            valorUnitario: [null],
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
                error: (err) => {
                    this.alertService.showError(err.error.errors)
                },
            })
        }

        let produtos = this.route.snapshot.data['produtos'] as ProdutoResponse[]
        if (produtos) {
            this.produtosOption = produtos.map((produto) => ({ label: produto.descricao, value: produto.id }))
        } else {
            this.produtoStore.getAllProdutos().subscribe({
                next: (value) => {
                    this.produtosOption = value.map((produto) => ({ label: produto.descricao, value: produto.id }))
                },
                error: (err) => {
                    this.alertService.showError(err.error.errors)
                },
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
                    itens: this.notaFiscal.itens.map((item) => {
                        return {
                            produtoId: item.produto.id,
                            produtoDescricao: item.produto.descricao,
                            quantidade: item.quantidade,
                            valorUnitario: item.valorUnitario,
                        } as NotaFiscalItemRequest
                    }),
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

        this.notaFiscalStore.createNotaFiscal(notaFicalRequest).subscribe({
            error: (err) => {
                this.alertService.showError(err.error.errors)
            },
            complete: () => {
                this.router.navigate(['/notas-fiscais'])
                this.alertService.showSuccess('Nota Fiscal cadastrada com sucesso')
            },
        })
    }

    editar() {
        const data = this.form.getRawValue()
        const notaFicalRequest = {
            id: this.notaFiscal?.id,
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
            itens: data.itens.map((item: NotaFiscalItemRequest) => {
                return {
                    produtoId: item.produtoId,
                    produtoDescricao: item.produtoDescricao,
                    quantidade: item.quantidade,
                    valorUnitario: item.valorUnitario,
                } as NotaFiscalItemRequest
            }),
        } as NotaFiscalRequest

        this.notaFiscalStore.updateNotaFiscal(this.notaFiscal!.id, notaFicalRequest).subscribe({
            error: (err) => {
                this.alertService.showError(err.error.errors)
            },
            complete: () => {
                this.router.navigate(['/notas-fiscais'])
                this.alertService.showSuccess('Nota Fiscal atualizada com sucesso')
            },
        })
    }

    adicionarItemNotaFiscal() {
        const data = this.formItems.getRawValue()
        const notaFicalItem = {
            produtoId: data.produto.value,
            produtoDescricao: data.produto.label,
            quantidade: data.quantidade,
            valorUnitario: data.valorUnitario,
        } as NotaFiscalItemRequest

        if (this.verificaItem(notaFicalItem)) {
            this.alertService.showError('Produto já adicionado')
            return
        }

        this.form.patchValue({
            itens: [...this.form.getRawValue().itens, notaFicalItem],
        })
        this.formItems.reset()
        this.calcularTotal()
    }

    removerItemNotaFiscal(item: NotaFiscalItemRequest) {
        const itens = this.form.getRawValue().itens.filter((i: NotaFiscalItemRequest) => i !== item)
        this.form.patchValue({
            itens: itens,
        })
        this.calcularTotal()
    }

    calcularTotal() {
        const itens = this.form.getRawValue().itens
        const total = itens.reduce((acc: number, item: NotaFiscalItemRequest) => {
            return acc + item.quantidade * item.valorUnitario
        }, 0)
        this.form.patchValue({
            total: total,
        })
    }

    verificaItem(item: NotaFiscalItemRequest) {
        const itens = this.form.getRawValue().itens
        const itemEncontrado = itens.find((i: NotaFiscalItemRequest) => i.produtoId === item.produtoId)
        if (itemEncontrado) {
            return true
        }
        return false
    }

    limpar() {
        this.form.reset()
    }

    voltar() {
        this.router.navigate(['/notas-fiscais'])
    }
}
