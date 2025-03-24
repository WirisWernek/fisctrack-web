import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SituacaoProdutoEnum } from '@models/enums/situacao-produto.enum';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';

@Component({
	selector: 'app-form-produto',
	imports: [FormsModule, ReactiveFormsModule, SelectModule, InputTextModule, ButtonModule],
	templateUrl: './form-produto.component.html',
	styleUrl: './form-produto.component.scss'
})
export class FormProdutoComponent {
	form: FormGroup;
	fb = inject(FormBuilder)

	options: any[] = [
		{ label: 'Ativo', value: SituacaoProdutoEnum.ATIVO },
		{ label: 'Inativo', value: SituacaoProdutoEnum.INATIVO },
	]

	constructor() {
		this.form = this.fb.group({
			id: ['', Validators.required],
			descricao: ['', Validators.required],
			situacao: ['', Validators.required],
		})
	}

	cadastrar() { }
}
