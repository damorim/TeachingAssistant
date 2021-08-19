import express = require('express');
import bodyParser = require("body-parser");

import { Aluno } from '../common/aluno';
import { CadastroDeAlunos } from './cadastrodealunos';
import { CadastroMatricula } from './cadastromatricula';
import { Matricula } from '../common/matricula';

var taserver = express();

const cadastro: CadastroDeAlunos = new CadastroDeAlunos();
const cadastroMatriculas: CadastroMatricula = new CadastroMatricula();
var cadastroIndex = 1;

var allowCrossDomain = function(req: any, res: any, next: any) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}
taserver.use(allowCrossDomain);

taserver.use(bodyParser.json());

taserver.get('/alunos', function (req: express.Request, res: express.Response) {
  res.send(JSON.stringify(cadastro.getAlunos()));
})

taserver.post('/aluno', function (req: express.Request, res: express.Response) {
  var aluno: Aluno = <Aluno> req.body; //verificar se é mesmo Aluno!
  aluno = cadastro.cadastrar(aluno);
  if (aluno) {
    res.send({"success": "O aluno foi cadastrado com sucesso"});
  } else {
    res.send({"failure": "O aluno não pode ser cadastrado"});
  }
})

taserver.put('/aluno', function (req: express.Request, res: express.Response) {
  var aluno: Aluno = <Aluno> req.body;
  aluno = cadastro.atualizar(aluno);
  if (aluno) {
    res.send({"success": "O aluno foi atualizado com sucesso"});
  } else {
    res.send({"failure": "O aluno não pode ser atualizado"});
  }
})

taserver.get('/matriculas', (req: express.Request, res: express.Response) =>{
  return res.send(cadastroMatriculas.obterMatriculas());
});

taserver.post('/matriculas', (req: express.Request, res: express.Response) => {
  let { cpf, disciplina } = req.body;
  let matricula = new Matricula(cadastroIndex, cpf, disciplina);
  cadastroMatriculas.adicionarMatricula(matricula);

  return res.send(matricula);
})

var server = taserver.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

function closeServer(): void {
  server.close();
}

export { server, closeServer }