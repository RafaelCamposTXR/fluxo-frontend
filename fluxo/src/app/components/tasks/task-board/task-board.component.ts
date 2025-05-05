import { Component, Input, OnInit } from '@angular/core';
import { PrioridadeTarefaEnum } from '../../../shared/enums/prioridade-tarefa.enum';
import { TaskService } from '../../../core/services/task.service';
import { Task } from '../../../core/models/task.model';
import { ToasterService } from '../../../shared/services/toaster.service';
import { LoadingService } from '../../../shared/services/loading.service';
import { OfflineSyncService } from '../../../core/services/offline-sync.service';
import confetti from 'canvas-confetti';
import {StatusTarefaEnum} from "@shared/enums/status-tarefa.enum";

@Component({
  selector: 'app-task-board',
  templateUrl: './task-board.component.html',
  styleUrls: ['./task-board.component.scss']
})
export class TaskBoardComponent implements OnInit {
  @Input() boardName: string = '';
  tasks: Task[] = [];


  constructor(
    private taskService: TaskService,
    private toasterService: ToasterService,
    private loadingService: LoadingService,
    private offlineSyncService: OfflineSyncService
  ) {}

  ngOnInit() {
    this.loadTasks();
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

    // Envia para o servidor
    this.taskService.moveTask({
      tarefa: task.nome,
      novo_status: newStatus
    }).subscribe(
      (serverTask: Task) => {
        // Atualiza com os dados do servidor
        if (this.tasks[taskIndex]?.id === serverTask.id) {
          this.tasks[taskIndex] = serverTask;
        }
      },
      error => {
        // Reverte para o estado original em caso de erro
        if (this.tasks[taskIndex]?.id === originalTask.id) {
          this.tasks[taskIndex] = originalTask;
        }
        
        this.toasterService.show('Sem notícias do servidor. Te avisamos assim que a conexão voltar.', 'warning');
        this.offlineSyncService.addPendingChange(originalTask, newStatus);
      }
    );
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
