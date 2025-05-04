export interface Task {
    nome: string;
    descricao?: string;
    status: string;
    data_criacao?: string;
    data_conclusao?: string;
    prioridade?: number;
}

export interface TaskFilter {
    status?: string;
    data_inicio?: string;
    data_fim?: string;
    prioridade?: number;
}

export interface MoveTask {
    novo_status: string;
    tarefa: string;
}

export interface PatchTask {
    nome?: string;
    descricao?: string;
    status?: string;
    prioridade?: number;
    data_conclusao?: string;
}
