import { PrioridadeTarefaEnum } from '@shared/enums/prioridade-tarefa.enum';
import { StatusTarefaEnum } from '@shared/enums/status-tarefa.enum';

export interface Task {
    id: number;
    nome: string;
    descricao?: string;
    status: StatusTarefaEnum;
    prioridade?: PrioridadeTarefaEnum | undefined;
    responsavel?: string;
    data_criacao?: string;
    data_vencimento?: string;
    tempo_realizado?: number;
    tags?: string[];
    dependencias?: string[];
    checklist?: string[];
    em_alarme?: boolean;
}

export interface CreateTask {
    nome: string;
    descricao?: string;
    status: StatusTarefaEnum;
    prioridade?: PrioridadeTarefaEnum | undefined;
    responsavel?: string;
    data_criacao?: string;
    data_vencimento?: string;
    tempo_realizado?: number;
    tags?: string[];
    dependencias?: string[];
    checklist?: string[];
    em_alarme?: boolean;
}

export interface TaskFilter {
    ls_nome?: string[];
    ls_status?: StatusTarefaEnum[];
    ls_prioridade?: PrioridadeTarefaEnum[];
    ls_responsavel?: string[];
    ls_tags?: string[];
    ls_dependencias?: string[];
    em_alarme?: boolean;
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
    responsavel?: string;
    data_vencimento?: string;
    tags?: string[];
    dependencias?: string[];
    checklist?: string[];
}
