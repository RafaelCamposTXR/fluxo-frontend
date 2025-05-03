import { Component } from '@angular/core';

interface Task {
  id: number;
  title: string;
  description: string;
  status: 'todo' | 'doing' | 'done';
  priority: 'low' | 'medium' | 'high';
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
      title: 'Implementar Autenticação',
      description: 'Desenvolver sistema de login e registro de usuários',
      status: 'todo',
      priority: 'high',
      createdAt: new Date()
    },
    {
      id: 2,
      title: 'Design do Dashboard',
      description: 'Criar layout responsivo para o dashboard principal',
      status: 'doing',
      priority: 'medium',
      createdAt: new Date()
    },
    {
      id: 3,
      title: 'Configurar CI/CD',
      description: 'Implementar pipeline de integração contínua',
      status: 'done',
      priority: 'high',
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

  getPriorityClass(priority: string): string {
    return `priority-${priority}`;
  }
}
