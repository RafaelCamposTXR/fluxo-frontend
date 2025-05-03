import { Component, OnInit } from '@angular/core';

// Interface para definir o tipo das tarefas
interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  status: string;  // Pode ser 'concluída', 'pendente', etc.
}

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks-page.component.html',
  styleUrls: ['./tasks-page.component.scss']
})
export class TasksPageComponent implements OnInit {
  // Lista de tarefas inicial
  tasks: Task[] = [
    { id: 1, title: 'Tarefa 1', description: 'Descrição da Tarefa 1', dueDate: '2025-05-01', status: 'pendente' },
    { id: 2, title: 'Tarefa 2', description: 'Descrição da Tarefa 2', dueDate: '2025-05-02', status: 'pendente' },
    { id: 3, title: 'Tarefa 3', description: 'Descrição da Tarefa 3', dueDate: '2025-05-03', status: 'concluída' }
  ];

  constructor() { }

  ngOnInit(): void {
    // Aqui você pode carregar as tarefas de uma API, se necessário
  }

  // Função para alterar o status de uma tarefa
  toggleTaskStatus(taskId: number): void {
    const task = this.tasks.find(t => t.id === taskId);
    if (task) {
      task.status = task.status === 'concluída' ? 'pendente' : 'concluída';
    }
  }
}
