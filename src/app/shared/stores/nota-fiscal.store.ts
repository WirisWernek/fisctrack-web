import { HttpClient, HttpHeaders } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { NotaFiscalFilter } from '@models/dto/filters/nota-fiscal-filter.model'

import { NotaFiscalRequest } from '@models/dto/requests/nota-fiscal-request.model'
import { NotaFiscalResponse } from '@models/dto/responses/nota-fiscal-response.model'

@Injectable({
    providedIn: 'root',
})
export class NotaFiscalStore {
    httClient = inject(HttpClient)
    baseUrl = 'http://localhost:8080/api/nota-fiscal'
    private readonly headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    })

    getAllNotaFiscals() {
        return this.httClient.get<NotaFiscalResponse[]>(this.baseUrl, { headers: this.headers })
    }

    search(filter: NotaFiscalFilter) {
        return this.httClient.get<NotaFiscalResponse[]>(
            `${this.baseUrl}?numeroNota=${filter.numeroNota}&fornecedorId=${filter.fornecedorId}&dataEmissaoInicio=${filter.dataEmissaoInicio}&dataEmissaoFim=${filter.dataEmissaoFim}`,
            { headers: this.headers }
        )
    }

    getNotaFiscalById(id: number) {
        return this.httClient.get<NotaFiscalResponse>(`${this.baseUrl}/${id}`, { headers: this.headers })
    }

    createNotaFiscal(notaFiscal: NotaFiscalRequest) {
        return this.httClient.post(this.baseUrl, notaFiscal, { headers: this.headers })
    }

    updateNotaFiscal(id: number, notaFiscal: NotaFiscalRequest) {
        return this.httClient.put(`${this.baseUrl}/${id}`, notaFiscal, { headers: this.headers })
    }

    deleteNotaFiscal(id: number) {
        return this.httClient.delete(`${this.baseUrl}/${id}`, { headers: this.headers })
    }
}
