import express = require('express');
import bodyParser = require('body-parser');

var tvserver = express();

var allowCrossDomain = function (req: any, res: any, next: any) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
};

tvserver.use(allowCrossDomain);

tvserver.use(bodyParser.json());

tvserver.use('/userApi', require('./src/routes/user.api'));

tvserver.use('/carApi', require('./src/routes/car.api'));

// tvserver.get('/alunos', function (req: express.Request, res: express.Response) {
//   res.send(JSON.stringify(cadastro.getAlunos()));
// })

// tvserver.post('/aluno', function (req: express.Request, res: express.Response) {
//   var aluno: Aluno = <Aluno> req.body; //verificar se é mesmo Aluno!
//   aluno = cadastro.cadastrar(aluno);
//   if (aluno) {
//     res.send({"success": "O aluno foi cadastrado com sucesso"});
//   } else {
//     res.send({"failure": "O aluno não pode ser cadastrado"});
//   }
// })

// tvserver.put('/aluno', function (req: express.Request, res: express.Response) {
//   var aluno: Aluno = <Aluno> req.body;
//   aluno = cadastro.atualizar(aluno);
//   if (aluno) {
//     res.send({"success": "O aluno foi atualizado com sucesso"});
//   } else {
//     res.send({"failure": "O aluno não pode ser atualizado"});
//   }
// })

// tvserver.delete('/aluno/:cpf', function (req: express.Request, res: express.Response) {
//     let position = cadastro.deletar(req.params.cpf)
//     if (position !== -1) {
//       res.send({ success: "O aluno foi deletado com sucesso", alunoIndex: position});
//     } else {
//       res.send({"failure": "O aluno não pode ser deletado"});
//   }
// })

// function clearServer(): void {
//   cadastro = new CadastroDeAlunos();
// }

// function closeServer(): void {
//   server.close();
// }

var server: any = tvserver.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

// export { server, closeServer, clearServer };
export { server };
