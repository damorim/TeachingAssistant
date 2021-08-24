import { Matricula } from '../common/matricula';
import { isBefore } from 'date-fns';

export class CadastroMatricula {
    matriculas: Matricula[];
    dataLimite: Date;

    constructor(){
        this.dataLimite = new Date();
        this.matriculas = [];
    }

    obterMatriculas() {
        return this.matriculas;
    }  

    adicionarMatricula(matricula: Matricula){
        
        let check = this.matriculas.find(m =>
             m.cpf == matricula.cpf &&
             m.disciplina == matricula.disciplina);
             
        let agr = new Date();
        if(check || (isBefore(this.dataLimite, agr))){
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

    definirDataLimite(dataLimite: Date){
        this.dataLimite = dataLimite;
    }
}