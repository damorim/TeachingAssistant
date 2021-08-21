export class Matricula {
    id: number;
    cpf: string;
    nomeAluno: string;
    disciplina: string;
    notas: number[];

    constructor(id: number, cpf: string, nomeAluno : string, disciplina: string){
        this.id = id;
        this.cpf = cpf;
        this.nomeAluno = nomeAluno;
        this.disciplina = disciplina;
        this.notas = [0, 0, 0];
    }

    adicionarNota(nota: number){
        this.notas.push(nota);
    }
}