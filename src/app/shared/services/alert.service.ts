import { inject, Injectable } from '@angular/core'
import { MessageService } from 'primeng/api'

@Injectable({
    providedIn: 'root',
})
export class AlertService {
    private messageService = inject(MessageService)

    showSuccess(message: string) {
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: message })
    }

    showError(error: string[]) {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: error.join(', ') })
    }
}
