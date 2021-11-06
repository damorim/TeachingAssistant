import { Aluno } from './aluno';

export class AlunoService {
  alunos: Aluno[] = [];
  gravar(aluno: Aluno): Aluno {
    let result = null;
    if (!this.alunos.find(a => a.cpf == aluno.cpf)) {
      this.alunos.push(aluno);
      result = aluno;
    }
    return result;
  }
}