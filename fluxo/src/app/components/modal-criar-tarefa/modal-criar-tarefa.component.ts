import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TaskService } from '@core/services/task.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-criar-tarefa',
  templateUrl: './modal-criar-tarefa.component.html',
  styleUrls: ['./modal-criar-tarefa.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule]
})
export class ModalCriarTarefaComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private dialogRef: MatDialogRef<ModalCriarTarefaComponent>
  ) {
    this.form = this.fb.group({
      nome: [''],
      descricao: [''],
      status: [''],
      prioridade: [''],
      responsavel: [''],
      data_vencimento: [''],
      etiquetas: [''],
      dependencias: [''],
    });
  }

  enviar() {
    if (this.form.valid) {
      const formValue = this.form.value;
  
      const tarefaPayload = {
        nome: formValue.nome,
        descricao: formValue.descricao,
        status: formValue.status,
        prioridade: formValue.prioridade,
        responsavel: formValue.responsavel,
        data_vencimento: formValue.data_vencimento || null,
        tags: typeof formValue.etiquetas === 'string'
          ? formValue.etiquetas.split(',').map((tag: string) => tag.trim()).filter((tag: string) => tag)
          : [],
        dependencias: typeof formValue.dependencias === 'string'
          ? formValue.dependencias.split(',').map((dep: string) => dep.trim()).filter((dep: string) => dep)
          : [],
      };
  
      this.taskService.createTask(tarefaPayload).subscribe(() => {
        this.dialogRef.close();
      });
    }
  }

  fechar() {
    this.dialogRef.close();
  }
}