import { Injectable } from '@angular/core';
import { BehaviorSubject, fromEvent, merge, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Task } from '../models/task.model';
import { TaskService } from './task.service';
import { ToasterService } from '@shared/services/toaster.service';

interface PendingChange {
  id: number;
  taskId: number;
  taskName: string;
  newStatus: 'todo' | 'doing' | 'done';
  timestamp: number;
  retryCount: number;
}

@Injectable({
  providedIn: 'root'
})
export class OfflineSyncService {
  private readonly STORAGE_KEY = 'pending_task_changes';
  private readonly MAX_RETRIES = 6;
  private readonly RETRY_INTERVAL = 10000; // 10 segundos

  private pendingChanges = new BehaviorSubject<PendingChange[]>(this.loadPendingChanges());
  private isOnline = new BehaviorSubject<boolean>(navigator.onLine);
  private syncInProgress = false;

  constructor(
    private taskService: TaskService,
    private toasterService: ToasterService
  ) {
    // Monitora mudanças na conexão
    merge(
      fromEvent(window, 'online'),
      fromEvent(window, 'offline')
    ).pipe(
      debounceTime(300),
      map(() => navigator.onLine),
      distinctUntilChanged()
    ).subscribe(isOnline => {
      this.isOnline.next(isOnline);
      if (isOnline) {
        this.syncPendingChanges();
      }
    });

    // Tenta sincronizar periodicamente
    setInterval(() => {
      if (this.isOnline.value && this.hasPendingChanges) {
        this.syncPendingChanges();
      }
    }, this.RETRY_INTERVAL);
  }

  get hasPendingChanges(): boolean {
    return this.pendingChanges.value.length > 0;
  }

  // Adiciona uma mudança à fila de sincronização
  addPendingChange(task: Task, newStatus: 'todo' | 'doing' | 'done'): void {
    const changes = this.pendingChanges.value;
    
    // Remove mudança anterior da mesma tarefa se existir
    const filteredChanges = changes.filter(c => c.taskId !== task.id);
    
    const newChange: PendingChange = {
      id: Date.now(),
      taskId: task.id,
      taskName: task.nome,
      newStatus,
      timestamp: Date.now(),
      retryCount: 0
    };

    this.pendingChanges.next([...filteredChanges, newChange]);
    this.savePendingChanges();

    // Tenta sincronizar imediatamente se estiver online
    if (this.isOnline.value) {
      this.syncPendingChanges();
    }
  }

  // Tenta sincronizar todas as mudanças pendentes
  private async syncPendingChanges(): Promise<void> {
    if (this.syncInProgress || !this.hasPendingChanges) return;

    this.syncInProgress = true;
    const changes = [...this.pendingChanges.value];

    for (const change of changes) {
      try {
        await this.taskService.moveTask({
          tarefa: change.taskName,
          novo_status: change.newStatus
        }).toPromise();

        // Sucesso: remove a mudança da fila
        this.removePendingChange(change.id);
        
        if (this.pendingChanges.value.length === 0) {
          this.toasterService.show('Todas as mudanças foram sincronizadas com sucesso!', 'success');
        }
      } catch (error) {
        change.retryCount++;
        
        // Se excedeu o número máximo de tentativas, remove da fila
        if (change.retryCount >= this.MAX_RETRIES) {
          this.toasterService.show(
            `Não foi possível sincronizar a tarefa "${change.taskName}" com o servidor. Contate o time de tecnologia`,
            'error'
          );
        }
      }
    }

    this.savePendingChanges();
    this.syncInProgress = false;
  }

  private removePendingChange(id: number): void {
    const changes = this.pendingChanges.value.filter(c => c.id !== id);
    this.pendingChanges.next(changes);
    this.savePendingChanges();
  }

  private loadPendingChanges(): PendingChange[] {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (!stored) return [];
    
    try {
      return JSON.parse(stored);
    } catch {
      return [];
    }
  }

  private savePendingChanges(): void {
    localStorage.setItem(
      this.STORAGE_KEY,
      JSON.stringify(this.pendingChanges.value)
    );
  }
}
