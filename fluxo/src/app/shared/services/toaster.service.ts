import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type ToastType = 'error' | 'warning' | 'success' | 'info';

export interface Toast {
  message: string;
  type: ToastType;
  id: number;
}

@Injectable({
  providedIn: 'root'
})
export class ToasterService {
  private toasts = new BehaviorSubject<Toast[]>([]);
  toasts$ = this.toasts.asObservable();
  private nextId = 1;

  show(message: string, type: ToastType = 'info') {
    const toast: Toast = {
      message,
      type,
      id: this.nextId++
    };

    const currentToasts = this.toasts.getValue();
    this.toasts.next([...currentToasts, toast]);

    // Remove o toast após 3 segundos
    setTimeout(() => {
      this.remove(toast.id);
    }, 3000);
  }

  private remove(id: number) {
    const currentToasts = this.toasts.getValue();
    this.toasts.next(currentToasts.filter(t => t.id !== id));
  }
}
