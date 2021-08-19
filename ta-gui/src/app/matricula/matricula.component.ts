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
            },
            error: () => {
                console.log("Erro ao realizar nova matrícula");
            }
        })
    }
}
    
