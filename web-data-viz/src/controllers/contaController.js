var contaModel = require("../models/contaModel");

function buscarPorId(req, res) {
  var cnpj = req.query.cnpj;

  enderecoModel
    .buscarPorId(cnpj)
    .then((resultado) => {
      if (!resultado || resultado.length === 0) {
        console.error("Nenhuma empresa encontrada com o CNPJ:", cnpj);
        res.status(404).json({ mensagem: "Empresa não encontrada." });
        return;
      }

      res.status(200).json(resultado);
    })
    .catch((erro) => {
      console.error("Erro ao buscar por ID:", erro);
      res.status(500).json({ erro: "Erro ao buscar a empresa por CNPJ." });
    });
}

function buscarPorEmailOuUsername(req, res) {
  var email = req.query.email;
  var userName = req.query.userName;

  if (!email && !userName) {
    return res.status(400).json({
      mensagem: "Informe ao menos o e-mail ou o nome de usuário para a busca.",
    });
  }

  contaModel
    .buscarPorEmailOuUsername(email, userName)
    .then((resultado) => {
      if (!resultado || resultado.length === 0) {
        console.log(
          "Nenhum usuário encontrado com e-mail ou userName informado."
        );
        return res.status(404).json({
          mensagem:
            "Usuário não encontrado com e-mail ou nome de usuário informado.",
        });
      }

      res.status(200).json(resultado);
    })
    .catch((erro) => {
      console.error("Erro ao buscar usuário:", erro);
      res.status(500).json({ erro: "Erro ao buscar usuário." });
    });
}

function cadastrarUsuario(req, res) {
  var { nome, contato, userName, email, cargo, cnpj, senha } = req.body;

  contaModel.buscarPorId(cnpj).then((resultadoEmpresa) => {
    if (resultadoEmpresa.length == 0) {
      return res.status(404).json({ mensagem: "Empresa não encontrada." });
    }

    var idempresa = resultadoEmpresa[0].idempresa;

    contaModel
      .buscarPorEmailOuUsername(email, userName)
      .then((resultadoUsuario) => {
        if (resultadoUsuario.length > 0) {
          return res.status(409).json({
            mensagem:
              "Usuário já cadastrado com este e-mail ou nome de usuário.",
          });
        }

        contaModel
          .cadastrarUsuario(
            nome,
            contato,
            userName,
            email,
            cargo,
            senha,
            idempresa
          )
          .then((resultado) => {
            res.status(201).json({
              mensagem: "Usuário cadastrado com sucesso!",
              dados: resultado,
            });
          })
          .catch((erro) => {
            console.error("Erro ao cadastrar o usuário:", erro);
            res.status(500).json({ mensagem: "Erro ao cadastrar usuário." });
          });
      });
  });
}

module.exports = {
  buscarPorId,
  cadastrarUsuario,
  buscarPorEmailOuUsername,
};
