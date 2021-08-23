import { Injectable }    from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, map } from 'rxjs/operators';
import { Matricula } from '../../../../common/matricula'

@Injectable()
export class MatriculaService {

  private headers = new HttpHeaders({'Content-Type': 'application/json'});
  private matriculasURL = 'http://localhost:3000/matriculas';

  constructor(private http: HttpClient) {}

  obterMatriculas(): Observable<Matricula[]> {
    return this.http.get<Matricula[]>(this.matriculasURL);
  }

  atualizarMatricula(matricula: Matricula): Observable<any>{
    return this.http.put<any>(this.matriculasURL + '/' + matricula.id, matricula);
  }

  deletarMatricula(id: number): Observable<any>{
    return this.http.delete<any>(this.matriculasURL + '/' + id);
  }

  cadastrarMatricula(cpf: string, nomeAluno:string, disciplina: string) {
      return this.http.post<any>(this.matriculasURL, {
          cpf,
          nomeAluno,
          disciplina
      });
  }

  definirDataLimite(dataLimite : Date){
    return this.http.post<any>(this.matriculasURL + '/data', {
      dataLimite
    });
  }
}