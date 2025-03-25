import { HttpClient, HttpHeaders } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { FornecedorRequest } from '@models/dto/requests/fornecedor-request.model'
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

    getFornecedorById(id: number) {
        return this.httClient.get<FornecedorResponse>(`${this.baseUrl}/${id}`, { headers: this.headers })
    }

    createFornecedor(fornecedor: FornecedorRequest) {
        return this.httClient.post(this.baseUrl, fornecedor, { headers: this.headers })
    }

    updateFornecedor(id: number, fornecedor: FornecedorRequest) {
        return this.httClient.put(`${this.baseUrl}/${id}`, fornecedor, { headers: this.headers })
    }

    deleteFornecedor(id: number) {
        return this.httClient.delete(`${this.baseUrl}/${id}`, { headers: this.headers })
    }
}
