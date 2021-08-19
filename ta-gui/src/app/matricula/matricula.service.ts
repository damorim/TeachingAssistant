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

  cadastrarMatricula(cpf: string, disciplina: string) {
      return this.http.post<any>(this.matriculasURL, {
          cpf,
          disciplina
      });
  }

}