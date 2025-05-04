import { PrioridadeTarefaEnum } from '@shared/enums/prioridade-tarefa.enum';

export interface Task {
    id: number;
    nome: string;
    descricao?: string;
    status: string;
    data_criacao?: string;
    data_conclusao?: string;
    prioridade: PrioridadeTarefaEnum;
}

export interface TaskFilter {
    status?: string;
    data_inicio?: string;
    data_fim?: string;
    prioridade?: PrioridadeTarefaEnum;
}

export interface MoveTask {
    novo_status: string;
    tarefa: string;
}

export interface PatchTask {
    nome?: string;
    descricao?: string;
    status?: string;
    prioridade?: PrioridadeTarefaEnum;
    data_conclusao?: string;
}
