import { Matricula } from '../common/matricula';

export class CadastroMatricula {
    matriculas: Matricula[];

    constructor(){
        this.matriculas = [];
    }

    obterMatriculas() {
        return this.matriculas;
    }

    adicionarMatricula(matricula: Matricula){
        this.matriculas.push(matricula);
    }

    atualizarMatricula(matricula: Matricula){
        this.matriculas = this.matriculas.filter(m => m.id != matricula.id);
        this.matriculas.push(matricula);
    }

    removerMatricula(idMatricula: Number){
        this.matriculas = this.matriculas.filter(m => m.id != idMatricula);
    }

    
}