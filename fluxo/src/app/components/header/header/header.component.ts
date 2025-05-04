import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(private router: Router) {}

  onNewTask(): void {
    // TODO: Implementar criação de nova tarefa
    console.log('Nova tarefa');
  }

  onProfile(): void {
    // TODO: Implementar navegação para perfil
    console.log('Perfil');
  }

  onLogout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
