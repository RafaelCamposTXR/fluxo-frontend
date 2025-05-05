import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalCriarTarefaService } from '@shared/services/modal-criar-tarefa.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(private router: Router, private modalCriarTarefaService: ModalCriarTarefaService) {}

  onNewTask(): void {
    this.modalCriarTarefaService.open();
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
