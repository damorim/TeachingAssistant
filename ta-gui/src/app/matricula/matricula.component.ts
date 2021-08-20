import { Component, OnInit } from "@angular/core";
import { Matricula } from "../../../../common/matricula";
import { MatriculaService } from "./matricula.service";

@Component({
    selector: 'matriculas',
    templateUrl: './matricula.component.html',
    styleUrls: ['./matricula.component.css']
  })
export class MatriculasComponent implements OnInit{
    
    matriculas: Matricula[] = [];

    cpfAluno: string = "";
    disciplina: string = "";

    constructor(private matriculaService: MatriculaService){}

    ngOnInit(): void {
        this.listarMatriculas();
    }

    listarMatriculas(){
        return this.matriculaService.obterMatriculas().subscribe({
            next: (matriculas: Matricula[]) => {
                this.matriculas = matriculas;
            },
            error: () => {
                console.log("Erro ao obter as matrículas")
            }
        })
    }

    realizarMatricula(cpf: string, disciplina: string){
        return this.matriculaService.cadastrarMatricula(cpf, disciplina).subscribe({
            next: () => {
                this.listarMatriculas();
                this.cpfAluno = "";
                this.disciplina = "";
            },
            error: () => {
                console.log("Erro ao realizar nova matrícula");
            }
        })
    }

    atualizarMatricula(matricula: Matricula){
        for(let nota of matricula.notas){
            if(nota < 0 || nota > 10){
                this.listarMatriculas();
                return;
            }
        }

        return this.matriculaService.atualizarMatricula(matricula).subscribe({
            next: () => {
                this.listarMatriculas();
            },
            error: () => {
                console.log("Erro ao atualizar a matrícula");
            }
        })
    }

    deletarMatricula(id: number){
        return this.matriculaService.deletarMatricula(id).subscribe({
            next: () => {
                this.listarMatriculas();
            },
            error: () => {
                console.log("Erro ao deletar a matrícula");
            }
        })
    }
}
    
