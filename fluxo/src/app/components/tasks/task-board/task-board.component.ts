import { Component } from '@angular/core';
import { PrioridadeTarefaEnum } from '@shared/enums/prioridade-tarefa.enum';

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
      this.tasks[taskIndex].status = newStatus;
    }
  }

  getPriorityClass(priority: PrioridadeTarefaEnum): string {
    return `${priority}`;
  }
}
