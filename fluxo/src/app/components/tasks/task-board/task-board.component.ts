import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { PrioridadeTarefaEnum } from '../../../shared/enums/prioridade-tarefa.enum';
import { TaskService } from '../../../core/services/task.service';
import { Task } from '../../../core/models/task.model';
import { ToasterService } from '../../../shared/services/toaster.service';
import { LoadingService } from '../../../shared/services/loading.service';
import { OfflineSyncService } from '../../../core/services/offline-sync.service';
import { AlertWebsocketService } from '../../../shared/services/alert-websocket.service';
import { Subscription, timer } from 'rxjs';
import { finalize, timeout, catchError } from 'rxjs/operators';
import confetti from 'canvas-confetti';
import {StatusTarefaEnum} from "@shared/enums/status-tarefa.enum";

@Component({
  selector: 'app-task-board',
  templateUrl: './task-board.component.html',
  styleUrls: ['./task-board.component.scss']
})
export class TaskBoardComponent implements OnInit, OnDestroy {
  @Input() boardName: string = '';
  tasks: Task[] = [];
  private alertSubscription!: Subscription;

  constructor(
    private taskService: TaskService,
    private toasterService: ToasterService,
    private loadingService: LoadingService,
    private offlineSyncService: OfflineSyncService,
    private alertWebsocketService: AlertWebsocketService
  ) {}

  ngOnInit() {
    this.loadTasks();
    this.subscribeToAlerts();
  }

  ngOnDestroy() {
    if (this.alertSubscription) {
      this.alertSubscription.unsubscribe();
    }
  }

  private subscribeToAlerts() {
    this.alertSubscription = this.alertWebsocketService.getAlerts().subscribe(
      (message) => {
        this.toasterService.show(message, 'info');
        this.loadTasks(); // Recarrega as tarefas quando receber um alerta
      }
    );
  }

  loadTasks() {
    this.taskService.getTasks({
      prioridade: undefined
    }).subscribe(
      (tasks: Task[]) => {
        this.tasks = tasks;
      },
      error => {
        console.error('Erro ao carregar tarefas:', error);
      }
    );
  }

  getTodoTasks(): Task[] {
    return this.tasks.filter(task => task && task.status === StatusTarefaEnum.a_fazer);
  }

  getDoingTasks(): Task[] {
    return this.tasks.filter(task => task && task.status === StatusTarefaEnum.em_progresso);
  }

  getDoneTasks(): Task[] {
    return this.tasks.filter(task => task && task.status === StatusTarefaEnum.concluida);
  }

  moveTask(task: Task, newStatus: StatusTarefaEnum): void {
    if (!task || !task.id) return;

    const taskIndex = this.tasks.findIndex(t => t && t.id === task.id);
    if (taskIndex === -1) return;

    // Timer para mostrar o loading apenas se demorar
    const loadingTimer = timer(1000).subscribe(() => {
      this.loadingService.show();
    });

    // Cria uma cópia da tarefa original antes de qualquer modificação
    const originalTask = { ...this.tasks[taskIndex] };
    
    // Atualiza localmente (otimistic update)
    const updatedTask: Task = {
      ...originalTask,
      status: newStatus
    };
    this.tasks[taskIndex] = updatedTask;

    // Dispara animação se necessário
    if (newStatus === StatusTarefaEnum.concluida && originalTask.status !== StatusTarefaEnum.concluida) {
      this.triggerSuccessAnimation();
    }

    // Tenta enviar para o servidor
    this.taskService.moveTask({
      tarefa: task.nome,
      novo_status: newStatus
    }).pipe(
      timeout(3000), // Timeout após 3 segundos
      catchError(error => {
        this.loadingService.show(); // Mostra loading em caso de erro
        throw error; // Re-throw para ser tratado no subscribe
      }),
      finalize(() => {
        loadingTimer.unsubscribe(); // Cancela apenas o timer do loading inicial
        // O hide será controlado pelo serviço de sync
      })
    ).subscribe({
      next: (serverTask: Task) => {
        // Atualiza com os dados do servidor se necessário
        if (this.tasks[taskIndex]?.id === serverTask.id) {
          this.tasks[taskIndex] = serverTask;
        }
        // Envia alerta via WebSocket
        this.alertWebsocketService.sendAlert(
          `Tarefa "${task.nome}" foi movida para ${this.getStatusLabel(newStatus)}`
        );
        this.loadingService.hide(); // Esconde loading apenas em caso de sucesso
      },
      error: error => {
        // Mantém a alteração local e adiciona à fila de sincronização
        this.toasterService.show('Sem notícias do servidor. A alteração será sincronizada quando a conexão voltar.', 'warning');
        this.offlineSyncService.addPendingChange(updatedTask, newStatus);
        // Não esconde o loading aqui, será escondido quando a sincronização ocorrer
      }
    });
  }

  private getStatusLabel(status: StatusTarefaEnum): string {
    switch (status) {
      case StatusTarefaEnum.a_fazer:
        return 'A Fazer';
      case StatusTarefaEnum.em_progresso:
        return 'Em Progresso';
      case StatusTarefaEnum.concluida:
        return 'Concluída';
      default:
        return status;
    }
  }

  private triggerSuccessAnimation(): void {
    // Configuração do confete
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    }

    // Cria uma animação contínua de confete
    // @ts-ignore
    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#4CAF50', '#8BC34A'],
        gravity: 1.5,
        scalar: 1.2,
        shapes: ['circle', 'square']
      });

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#2196F3', '#03A9F4'],
        gravity: 1.5,
        scalar: 1.2,
        shapes: ['circle', 'square']
      });
    }, 250);
  }

  getPriorityClass(priority: PrioridadeTarefaEnum): string {
    return `${priority}`;
  }

  protected readonly StatusTarefaEnum = StatusTarefaEnum;
}
