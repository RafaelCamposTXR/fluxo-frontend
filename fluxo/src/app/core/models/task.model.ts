import { PrioridadeTarefaEnum } from '@shared/enums/prioridade-tarefa.enum';
import { StatusTarefaEnum } from '@shared/enums/status-tarefa.enum';

export interface Task {
    id: number;
    nome: string;
    descricao?: string;
    status: StatusTarefaEnum;
    data_criacao?: string;
    data_conclusao?: string;
    prioridade?: PrioridadeTarefaEnum | undefined;
}

export interface TaskFilter {
    status?: string;
    data_inicio?: string;
    data_fim?: string;
    prioridade?: PrioridadeTarefaEnum | undefined;
}

export interface MoveTask {
    novo_status: string;
    tarefa: string;
}

export interface PatchTask {
    nome?: string;
    descricao?: string;
    status?: string;
    prioridade?: PrioridadeTarefaEnum | undefined;
    data_conclusao?: string;
}
