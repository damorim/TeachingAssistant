import { Matricula } from '../../common/matricula';
import { CadastroMatricula } from '../cadastromatricula';

describe("O cadastro de matriculas", () => {
  var cadastro: CadastroMatricula;

  beforeEach(() => cadastro = new CadastroMatricula());

  it("é inicialmente vazio", () => {
    expect(cadastro.matriculas.length).toBe(0);
  });

  it("matricula alunos corretamente", () => {
    const matricula: Matricula = new Matricula(1, '12345678900', 'Mateus Loureiro', 'ESS');
    cadastro.adicionarMatricula(matricula);
    expect(cadastro.matriculas.length).toBe(1);

    const matriculaAchada = cadastro.matriculas.find(({id}) => id === 1);
    expect(matriculaAchada).not.toBeNull();
    
    const {id, cpf, nomeAluno, disciplina} = matriculaAchada;
    expect(id).toBe(matricula.id);
    expect(cpf).toBe(matricula.cpf);
    expect(nomeAluno).toBe(matricula.nomeAluno);
    expect(disciplina).toBe(matricula.disciplina);
  });

  it("nao matricula alunos com mesmo cpf na mesma turma", () => {
    const matricula: Matricula = new Matricula(1, '12345678900', 'Mateus Loureiro', 'ESS');
    const matricula2: Matricula = new Matricula(1, '12345678900', 'Mateus Loureiro', 'ESS');
    
    const sucesso = cadastro.adicionarMatricula(matricula);
    expect(sucesso).toBe(matricula);
    expect(cadastro.matriculas.length).toBe(1);

    const sucesso2 = cadastro.adicionarMatricula(matricula2);
    expect(sucesso2).toBe(null);
    expect(cadastro.matriculas.length).toBe(1);
  });

  it("nao matricula alunos com mesmo cpf na mesma turma", () => {
    const matricula: Matricula = new Matricula(1, '12345678900', 'Mateus Loureiro', 'ESS');
    const matricula2: Matricula = new Matricula(2, '12345678900', 'Aluno 2', 'ESS');
    
    const sucesso = cadastro.adicionarMatricula(matricula);
    expect(sucesso).toBe(matricula);
    expect(cadastro.matriculas.length).toBe(1);

    const sucesso2 = cadastro.adicionarMatricula(matricula2);
    expect(sucesso2).toBe(null);
    expect(cadastro.matriculas.length).toBe(1);

    const matricula3: Matricula = new Matricula(2, '12345678900', 'Aluno 2', 'Outra disciplina');
    const sucesso3 = cadastro.adicionarMatricula(matricula3);
    expect(sucesso3).toBe(matricula3);
    expect(cadastro.matriculas.length).toBe(2);
  });

  it("esta removendo alunos corretamente", () => {
    const matricula: Matricula = new Matricula(1, '12345678900', 'Mateus Loureiro', 'ESS');
    cadastro.adicionarMatricula(matricula);

    cadastro.removerMatricula(matricula.id);
    expect(cadastro.matriculas.length).toBe(0);
  });

  it("esta atualizando alunos corretamente", () => {
    const matricula: Matricula = new Matricula(1, '12345678900', 'Mateus Loureiro', 'ESS');
    cadastro.adicionarMatricula(matricula);

    const atualizacao: Matricula = new Matricula(1, '00987654321', 'Loureiro Mateus', 'Testes');
    const sucesso = cadastro.atualizarMatricula(atualizacao);
    expect(sucesso).toBeTruthy();

    const atualizado = cadastro.matriculas.find(({id}) => id === matricula.id)
    const {id, cpf, nomeAluno, disciplina} = atualizado;
    expect(id).toBe(atualizacao.id);
    expect(cpf).toBe(atualizacao.cpf);
    expect(nomeAluno).toBe(atualizacao.nomeAluno);
    expect(disciplina).toBe(atualizacao.disciplina);
  });

  it("esta configurando a data limite corretamente", () => {
    const hoje = new Date();
    cadastro.definirDataLimite(hoje);

    expect(cadastro.dataLimite).toBe(hoje);
  });
});
