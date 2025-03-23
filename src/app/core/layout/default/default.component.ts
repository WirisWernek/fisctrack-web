import { Component, OnInit } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { MenuItem } from 'primeng/api'
import { Menubar } from 'primeng/menubar'

@Component({
    selector: 'app-default',
    imports: [RouterOutlet, Menubar],
    templateUrl: './default.component.html',
    styleUrl: './default.component.scss',
})
export class DefaultComponent implements OnInit {
    items: MenuItem[] | undefined

    ngOnInit() {
        this.items = [
            {
                label: 'Produtos',
                icon: 'pi pi-home',
                items: [
                    {
                        label: 'Cadastrar Produto',
                        icon: 'pi pi-folder',
                    },
                    {
                        label: 'Buscar Produtos',
                        icon: 'pi pi-star',
                    },
                ],
            },
            {
                label: 'Fornecedores',
                icon: 'pi pi-star',
                items: [
                    {
                        label: 'Cadastrar Fornecedor',
                        icon: 'pi pi-folder',
                    },
                    {
                        label: 'Buscar Fornecedores',
                        icon: 'pi pi-star',
                    },
                ],
            },
            {
                label: 'Notas Fiscais',
                icon: 'pi pi-search',
                items: [
                    {
                        label: 'Cadastrar Nota Fiscal',
                        icon: 'pi pi-bolt',
                    },
                    {
                        label: 'Buscar Notas Fiscais',
                        icon: 'pi pi-server',
                    },
                ],
            },
        ]
    }
}
