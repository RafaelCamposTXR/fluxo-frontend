import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalCriarTarefaComponent } from '../../components/modal-criar-tarefa/modal-criar-tarefa.component';

@Injectable({ providedIn: 'root' })
export class ModalCriarTarefaService {
  constructor(private dialog: MatDialog) {}

  open() {
    return this.dialog.open(ModalCriarTarefaComponent, {
      width: '60vw',
      height: '80vh',
    });
  }
}