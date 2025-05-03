import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  onNewTask(): void {
    // TODO: Implementar criação de nova tarefa
    console.log('Nova tarefa');
  }

  onProfile(): void {
    // TODO: Implementar navegação para perfil
    console.log('Perfil');
  }

  onLogout(): void {
    // TODO: Implementar logout
    console.log('Logout');
  }
}
