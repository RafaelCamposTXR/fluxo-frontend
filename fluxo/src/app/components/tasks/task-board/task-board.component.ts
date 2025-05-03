import { Component, Input } from '@angular/core';
import { PrioridadeTarefaEnum } from '@shared/enums/prioridade-tarefa.enum';
import confetti from 'canvas-confetti';

interface Task {
  id: number;
  title: string;
  description: string;
  status: 'todo' | 'doing' | 'done';
  priority: PrioridadeTarefaEnum;
  createdAt: Date;
}

@Component({
  selector: 'app-task-board',
  templateUrl: './task-board.component.html',
  styleUrls: ['./task-board.component.scss']
})
export class TaskBoardComponent {
  @Input() boardName: string = 'Meu Board';

  tasks: Task[] = [
    {
      id: 1,
      title: 'Implementar autenticação',
      description: 'Adicionar sistema de login com JWT',
      status: 'todo',
      priority: PrioridadeTarefaEnum.ALTA,
      createdAt: new Date()
    },
    {
      id: 2,
      title: 'Criar componentes base',
      description: 'Desenvolver componentes reutilizáveis',
      status: 'doing',
      priority: PrioridadeTarefaEnum.MEDIA,
      createdAt: new Date()
    },
    {
      id: 3,
      title: 'Configurar ambiente',
      description: 'Preparar ambiente de desenvolvimento',
      status: 'done',
      priority: PrioridadeTarefaEnum.BAIXA,
      createdAt: new Date()
    }
  ];

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
    const taskIndex = this.tasks.findIndex(t => t.id === task.id);
    if (taskIndex !== -1) {
      const oldStatus = this.tasks[taskIndex].status;
      this.tasks[taskIndex].status = newStatus;

      // Se a tarefa foi movida para 'done', dispara o confete
      if (newStatus === 'done' && oldStatus !== 'done') {
        this.triggerSuccessAnimation();
      }
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
