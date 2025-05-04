import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasksPageComponent } from './pages/tasks/tasks-page/tasks-page.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'tasks', component: TasksPageComponent },  // Definindo a rota para /tasks
  { path: '', redirectTo: '/login', pathMatch: 'full' },  // Definindo a rota padrão para redirecionar para /tasks
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
