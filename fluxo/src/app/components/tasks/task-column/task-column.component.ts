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

  getPriorityClass(priority: PrioridadeTarefaEnum): string {
    return `priority-${priority}`;
  }

  moveTask(task: Task, newStatus: 'todo' | 'doing' | 'done'): void {
    this.moveTaskEvent.emit({ task, status: newStatus });
  }
}
