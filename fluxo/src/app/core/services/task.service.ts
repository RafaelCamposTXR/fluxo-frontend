import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseHttpService } from './base-http.service';
import { Task, CreateTask, TaskFilter, MoveTask, PatchTask } from '../models/task.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService extends BaseHttpService {
  constructor(http: HttpClient, authService: AuthService) {
    super(http, authService);
  }

  getTasks(filter: TaskFilter): Observable<Task[]> {
    return this.post<Task[]>('tarefas/ver-tarefas', filter);
  }

  createTask(task: CreateTask): Observable<Task> {
    return this.post<Task>('tarefas/create-tarefas', task);
  }

  moveTask(moveTask: MoveTask): Observable<Task> {
    return this.put<Task>('tarefas/move-tarefas', moveTask);

  }

  editTask(taskName: string, patch: PatchTask): Observable<Task> {
    return this.put<Task>(`tarefas/edita-tarefas?tarefa=${encodeURIComponent(taskName)}`, patch);
  }
}
