import { HttpClient, HttpHeaders } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { FornecedorResponse } from '@models/dto/responses/fornecedor-reponse.model'

@Injectable({
    providedIn: 'root',
})
export class FornecedorStore {
    httClient = inject(HttpClient)
    baseUrl = 'http://localhost:8080/api/fornecedor'
    private readonly headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    })

    getAllFornecedores() {
        return this.httClient.get<FornecedorResponse[]>(this.baseUrl, { headers: this.headers })
    }
}
