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
        
        let check = this.matriculas.find(m =>
             m.cpf == matricula.cpf &&
             m.disciplina == matricula.disciplina);
        
        if(check){
            return null;
        }

        this.matriculas.push(matricula);
        return matricula;
    }

    atualizarMatricula(matricula: Matricula){
        this.matriculas = this.matriculas.filter(m => m.id != matricula.id);
        this.matriculas.push(matricula);
    }

    removerMatricula(idMatricula: number){
        this.matriculas = this.matriculas.filter(m => m.id != idMatricula);
    }

    
}