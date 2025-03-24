import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SituacaoProdutoEnum } from '@models/enums/situacao-produto.enum';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-form-fornecedor',
  imports: [FormsModule, ReactiveFormsModule, SelectModule, InputTextModule, ButtonModule],
  templateUrl: './form-fornecedor.component.html',
  styleUrl: './form-fornecedor.component.scss'
})
export class FormFornecedorComponent {
	form: FormGroup;
	fb = inject(FormBuilder)

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

	cadastrar() { }
}
