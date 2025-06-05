var empresaModel = require("../models/empresaModel");

function buscarPorCnpj(req, res) {
  var cnpj = req.query.cnpj;

  empresaModel.buscarPorCnpj(cnpj).then((resultado) => {
    res.status(200).json(resultado);
  });
}

function listar(req, res) {
  empresaModel.listar().then((resultado) => {
    res.status(200).json(resultado);
  });
}


function buscarPorId(req, res) {
  var id = req.params.id;

  empresaModel.buscarPorId(id).then((resultado) => {
    res.status(200).json(resultado);
  });
}

function cadastrar(req, res) {
  var { razaoSocial, nomeFantasia, email, cnpj, senha } = req.body;

  if (!razaoSocial || !nomeFantasia || !email || !cnpj || !senha) {
    return res.status(400).json({ mensagem: "Preencha todos os campos obrigatórios." });
  }

  empresaModel.buscarPorCnpj(cnpj)
    .then((resultado) => {
      if (resultado.length > 0) {
        return res.status(409).json({ mensagem: "CNPJ já cadastrado." });
      }

      return empresaModel.cadastrarEmpresa(razaoSocial, nomeFantasia, email, cnpj, senha)
        .then((resultado) => {
          res.status(201).json({ mensagem: "Empresa cadastrada com sucesso!", dados: resultado });
        });
    })
    .catch((erro) => {
      console.error("Erro ao cadastrar empresa:", erro);
      res.status(500).json({ mensagem: "Erro no servidor ao cadastrar empresa." });
    });
}

module.exports = {
  buscarPorCnpj,
  buscarPorId,
  cadastrar,
  listar,
};
