import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCriarTarefaComponent } from './modal-criar-tarefa.component';

describe('ModalCriarTarefaComponent', () => {
  let component: ModalCriarTarefaComponent;
  let fixture: ComponentFixture<ModalCriarTarefaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalCriarTarefaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalCriarTarefaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
