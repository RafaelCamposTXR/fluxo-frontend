import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private messageSubject = new BehaviorSubject<string>('');
  private timeoutId?: number;
  private spinnerOnlyMode = false;

  isLoading$ = this.loadingSubject.asObservable();
  message$ = this.messageSubject.asObservable();

  show(message: string = ''): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }

    this.loadingSubject.next(true);
    
    // Se já estiver em modo spinner-only, não mostra mensagem
    if (this.spinnerOnlyMode) {
      return;
    }
    
    this.messageSubject.next('Mantenha o fluxo. Iremos te conectar assim que possível');
    
    // Após 4 segundos, limpa a mensagem e marca como spinner-only
    this.timeoutId = window.setTimeout(() => {
      this.messageSubject.next('');
      this.spinnerOnlyMode = true;
    }, 4000);
  }

  hide(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
    this.loadingSubject.next(false);
    this.messageSubject.next('');
    this.spinnerOnlyMode = false; // reseta o modo quando esconde
  }
}
