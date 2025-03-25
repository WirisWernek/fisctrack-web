import { HttpClient, HttpHeaders } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { ProdutoRequest } from '@models/dto/requests/produto-request.model'
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

    getProdutoById(id: number) {
        return this.httClient.get<ProdutoResponse>(`${this.baseUrl}/${id}`, { headers: this.headers })
    }

    createProduto(produto: ProdutoRequest) {
        return this.httClient.post(this.baseUrl, produto, { headers: this.headers })
    }

    updateProduto(id: number, produto: ProdutoRequest) {
        return this.httClient.put(`${this.baseUrl}/${id}`, produto, { headers: this.headers })
    }

    deleteProduto(id: number) {
        return this.httClient.delete(`${this.baseUrl}/${id}`, { headers: this.headers })
    }
}
