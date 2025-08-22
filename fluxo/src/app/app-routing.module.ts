import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasksPageComponent } from './pages/tasks/tasks-page/tasks-page.component';
import { LoginPageComponent } from './pages/login/login-page/login-page.component';

const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'tasks', component: TasksPageComponent },  // Definindo a rota para /tasks
  { path: '', redirectTo: '/login', pathMatch: 'full' },  // Definindo a rota padrão para redirecionar para /tasks
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
