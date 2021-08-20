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

    atualizarMatricula(matricula: Matricula) : boolean{
        if(!this.matriculas.find(m => m.id == matricula.id))
            return false;
        this.matriculas = this.matriculas.filter(m => m.id != matricula.id);
        this.matriculas.push(matricula);
        return true;
    }

    removerMatricula(idMatricula: number){
        this.matriculas = this.matriculas.filter(m => m.id != idMatricula);
    }

    
}