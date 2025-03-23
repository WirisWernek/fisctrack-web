import { HttpClient, HttpHeaders } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { ProdutoResponse } from '@models/dto/responses/produto-reponse.model'

@Injectable({
    providedIn: 'root',
})
export class ProdutoStore {
    httClient = inject(HttpClient)
    baseUrl = 'http://localhost:8080/api/produto'
    private readonly headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    })

    getAllProdutos() {
        return this.httClient.get<ProdutoResponse[]>(this.baseUrl, { headers: this.headers })
    }
}
