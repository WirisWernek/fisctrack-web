import { CommonModule } from '@angular/common'
import { Component, inject, OnInit } from '@angular/core'
import { Router, RouterOutlet } from '@angular/router'
import { MenuItem } from 'primeng/api'
import { AvatarModule } from 'primeng/avatar'
import { InputTextModule } from 'primeng/inputtext'
import { Menubar } from 'primeng/menubar'
import { Ripple } from 'primeng/ripple'
import { ToastModule } from 'primeng/toast'
@Component({
    selector: 'app-default',
    imports: [RouterOutlet, Menubar, AvatarModule, InputTextModule, Ripple, CommonModule, ToastModule],
    templateUrl: './default.component.html',
    styleUrl: './default.component.scss',
})
export class DefaultComponent implements OnInit {
    items: MenuItem[] | undefined
    router = inject(Router)

    ngOnInit() {
        this.items = [
            {
                label: 'Gerenciar',
                icon: 'pi pi-fw pi-cog',
                items: [
                    {
                        label: 'Produtos',
                        icon: 'pi pi-shopping-bag',
                        items: [
                            {
                                label: 'Cadastrar Produto',
                                icon: 'pi pi-plus',
                                command: () => {
                                    this.router.navigate(['/produtos/form'])
                                },
                            },
                            {
                                label: 'Buscar Produtos',
                                icon: 'pi pi-list',
                                command: () => {
                                    this.router.navigate(['/produtos/list'])
                                },
                            },
                        ],
                    },
                    {
                        label: 'Fornecedores',
                        icon: 'pi pi-users',
                        items: [
                            {
                                label: 'Cadastrar Fornecedor',
                                icon: 'pi pi-plus',
                                command: () => {
                                    this.router.navigate(['/fornecedores/form'])
                                },
                            },
                            {
                                label: 'Buscar Fornecedores',
                                icon: 'pi pi-list',
                                command: () => {
                                    this.router.navigate(['/fornecedores/list'])
                                },
                            },
                        ],
                    },
                    {
                        label: 'Notas Fiscais',
                        icon: 'pi pi-file',
                        items: [
                            {
                                label: 'Cadastrar Nota Fiscal',
                                icon: 'pi pi-plus',
                                command: () => {
                                    this.router.navigate(['/notas-fiscais/form'])
                                },
                            },
                            {
                                label: 'Buscar Notas Fiscais',
                                icon: 'pi pi-list',
                                command: () => {
                                    this.router.navigate(['/notas-fiscais/list'])
                                },
                            },
                        ],
                    },
                ],
            },
        ]
    }
}
