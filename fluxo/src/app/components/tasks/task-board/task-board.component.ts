import { Component, Input, OnInit } from '@angular/core';
import { PrioridadeTarefaEnum } from '../../../shared/enums/prioridade-tarefa.enum';
import { TaskService } from '../../../core/services/task.service';
import { Task } from '../../../core/models/task.model';
import { ToasterService } from '../../../shared/services/toaster.service';
import { LoadingService } from '../../../shared/services/loading.service';
import { OfflineSyncService } from '../../../core/services/offline-sync.service';
import confetti from 'canvas-confetti';

@Component({
  selector: 'app-task-board',
  templateUrl: './task-board.component.html',
  styleUrls: ['./task-board.component.scss']
})
export class TaskBoardComponent implements OnInit {
  @Input() boardName: string = '';
  tasks: Task[] = [];

  private mockTasks: Task[] = [
    {
      id: 1,
      nome: 'Implementar autenticação',
      descricao: 'Adicionar sistema de login com JWT',
      status: 'todo',
      prioridade: PrioridadeTarefaEnum.ALTA,
      data_criacao: new Date().toISOString()
    },
    {
      id: 2,
      nome: 'Criar componentes base',
      descricao: 'Desenvolver componentes reutilizáveis',
      status: 'doing',
      prioridade: PrioridadeTarefaEnum.MEDIA,
      data_criacao: new Date().toISOString()
    },
    {
      id: 3,
      nome: 'Configurar ambiente',
      descricao: 'Preparar ambiente de desenvolvimento',
      status: 'done',
      prioridade: PrioridadeTarefaEnum.BAIXA,
      data_criacao: new Date().toISOString()
    }
  ];

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
    debugger;
    this.taskService.getTasks({}).subscribe(
      (tasks: Task[]) => {
        // Se não houver tarefas do backend, usa o mock
        debugger;
        this.tasks = tasks.length > 0 ? tasks : this.mockTasks;
      },
      error => {
        // Em caso de erro na API, usa o mock
        console.error('Erro ao carregar tarefas:', error);
        this.tasks = this.mockTasks;
      }
    );
  }

  getTodoTasks(): Task[] {
    return this.tasks.filter(task => task.status === 'todo');
  }

  getDoingTasks(): Task[] {
    return this.tasks.filter(task => task.status === 'doing');
  }

  getDoneTasks(): Task[] {
    return this.tasks.filter(task => task.status === 'done');
  }

  moveTask(task: Task, newStatus: 'todo' | 'doing' | 'done'): void {
    this.loadingService.show('Movendo tarefa...');

    this.taskService.moveTask({
      tarefa: task.nome,
      novo_status: newStatus
    }).subscribe(
      (updatedTask: Task) => {
        this.loadingService.hide();
        const taskIndex = this.tasks.findIndex(t => t.id === task.id);
        if (taskIndex !== -1) {
          this.tasks[taskIndex] = updatedTask;

          // Se a tarefa foi movida para 'done', dispara o confete
          if (newStatus === 'done' && task.status !== 'done') {
            this.triggerSuccessAnimation();
          }
        }
      },
      error => {
        // Em caso de erro na API, atualiza localmente
        this.loadingService.hide();
        console.error('Erro ao mover tarefa:', error);
        this.toasterService.show('Erro de conexão. Mudanças sendo salvas localmente.', 'warning');

        const taskIndex = this.tasks.findIndex(t => t.id === task.id);
        if (taskIndex !== -1) {
          // Atualiza localmente
          const updatedTask = { ...task, status: newStatus };
          this.tasks[taskIndex] = updatedTask;

          // Adiciona à fila de sincronização
          this.offlineSyncService.addPendingChange(task, newStatus);

          if (newStatus === 'done' && task.status !== 'done') {
            this.triggerSuccessAnimation();
          }
        }
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
}
