export class Matricula {
    id: number;
    cpf: string;
    disciplina: string;
    notas: number[];

    constructor(id: number, cpf: string, disciplina: string){
        this.id = id;
        this.cpf = cpf;
        this.disciplina = disciplina;
        this.notas = [0, 0, 0];
    }

    adicionarNota(nota: number){
        this.notas.push(nota);
    }
}