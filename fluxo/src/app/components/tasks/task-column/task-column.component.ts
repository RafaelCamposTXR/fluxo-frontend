import { Component, Input, Output, EventEmitter } from '@angular/core';
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
  selector: 'app-task-column',
  templateUrl: './task-column.component.html',
  styleUrls: ['./task-column.component.scss']
})
export class TaskColumnComponent {
  @Input() title: string = '';
  @Input() tasks: Task[] = [];
  @Input() type: 'todo' | 'doing' | 'done' = 'todo';
  @Output() moveTaskEvent = new EventEmitter<{task: Task, status: 'todo' | 'doing' | 'done'}>();

  completedTaskIds: Set<number> = new Set();
  statusChangedTaskIds: Set<number> = new Set();

  getPriorityClass(priority: PrioridadeTarefaEnum): string {
    return `priority-${priority}`;
  }

  moveTask(task: Task, newStatus: 'todo' | 'doing' | 'done'): void {
    // Adiciona o efeito de mudança de status
    this.statusChangedTaskIds.add(task.id);
    setTimeout(() => {
      this.statusChangedTaskIds.delete(task.id);
    }, 400); // Duração da animação de pulso

    // Se for movido para 'done', adiciona o efeito de conclusão
    if (newStatus === 'done') {
      this.completedTaskIds.add(task.id);
      setTimeout(() => {
        this.completedTaskIds.delete(task.id);
      }, 800); // Duração da animação de conclusão
    }
    this.moveTaskEvent.emit({ task, status: newStatus });
  }

  isTaskCompleting(taskId: number): boolean {
    return this.completedTaskIds.has(taskId);
  }

  getTaskClasses(task: Task): string {
    const classes = [`priority-${task.priority}`];
    
    if (this.completedTaskIds.has(task.id)) {
      classes.push('entering-done');
    }
    
    if (this.statusChangedTaskIds.has(task.id)) {
      classes.push('status-changed');
    }
    
    return classes.join(' ');
  }
}
