var enderecoModel = require("../models/enderecoModel");

function buscarPorCEP(req, res) {
  var cep = req.query.cep;

  enderecoModel
    .buscarPorCEP(cep)
    .then((resultado) => {
      if (!resultado || resultado.length === 0) {
        console.error("Nenhum endereço encontrado com o CEP:", cep);
        res.status(404).json({ mensagem: "Endereço não encontrado." });
        return;
      }

      res.status(200).json(resultado);
    })
    .catch((erro) => {
      console.error("Erro ao buscar por CEP:", erro);
      res.status(500).json({ erro: "Erro ao buscar o endereço por CEP." });
    });
}

function buscarPorNome(req, res) {
  var gerente = req.query.gerente;

  enderecoModel
    .buscarPorNome(gerente)
    .then((resultado) => {
      if (resultado.length === 0) {
        console.error("Usuário (gerente) não encontrado no banco!");
        res.status(404).json({ erro: "Usuário não encontrado" });
        return;
      }

      var idUsuario = resultado[0].idUsuario;

      res.status(200).json({ idUsuario });
    })
    .catch((erro) => {
      console.error("Erro ao buscar por nome:", erro);
      res.status(500).json({ erro: "Erro ao buscar por nome" });
    });
}

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

function cadastrarEndereco(req, res) {
  var {
    cep,
    logradouro,
    numeroStr,
    bairro,
    cidade,
    estado,
    cnpj,
    gerente,
    complemento,
    apelido,
  } = req.body;

  enderecoModel.buscarPorId(cnpj).then((resultadoEmpresa) => {
    if (resultadoEmpresa.length == 0) {
      return res
        .status(404)
        .json({ mensagem: "Empresa não encontrada pelo CNPJ." });
    }

    var idempresa = resultadoEmpresa[0].idempresa;

    enderecoModel.buscarPorNome(gerente).then((resultadoUsuario) => {
      if (resultadoUsuario.length == 0) {
        return res
          .status(404)
          .json({ mensagem: "Usuário (gerente) não encontrado pelo nome." });
      }

      var idUsuario = resultadoUsuario[0].idUsuario;

      enderecoModel.buscarPorCEP(cep).then((resultadoCEP) => {
        if (resultadoCEP.length > 0) {
          return res.status(409).json({ mensagem: "CEP já cadastrado." });
        }

        enderecoModel
          .cadastrarEndereco(
            cep,
            logradouro,
            numeroStr,
            bairro,
            cidade,
            estado,
            idempresa,
            idUsuario,
            complemento,
            apelido
          )
          .then((resultado) => {
            res.status(201).json({
              mensagem: "Endereço cadastrado com sucesso!",
              dados: resultado,
            });
          })
          .catch((erro) => {
            console.error("Erro ao cadastrar o endereço:", erro);
            res.status(500).json({ mensagem: "Erro ao cadastrar endereço." });
          });
      });
    });
  });
}

function atualizarEndereco(req, res) {
  var {
    cep,
    logradouro,
    numeroStr,
    bairro,
    cidade,
    estado,
    cnpj,
    gerente,
    complemento,
    apelido,
  } = req.body;

  enderecoModel.buscarPorId(cnpj).then((resultadoEmpresa) => {
    if (resultadoEmpresa.length == 0) {
      return res
        .status(404)
        .json({ mensagem: "Empresa não encontrada pelo CNPJ." });
    }

    var idempresa = resultadoEmpresa[0].idempresa;

    enderecoModel.buscarPorNome(gerente).then((resultadoUsuario) => {
      if (resultadoUsuario.length == 0) {
        return res
          .status(404)
          .json({ mensagem: "Usuário (gerente) não encontrado pelo nome." });
      }

      var idusuario = resultadoUsuario[0].idUsuario;

      enderecoModel
        .atualizarEndereco(
          cep,
          logradouro,
          numeroStr,
          bairro,
          cidade,
          estado,
          idempresa,
          idusuario,
          complemento,
          apelido
        )
        .then((resultado) => {
          res.status(200).json({
            mensagem: "Endereço atualizado com sucesso!",
            dados: resultado,
          });
        })
        .catch((erro) => {
          console.error("Erro ao atualizar o endereço:", erro);
          res.status(500).json({ mensagem: "Erro ao atualizar endereço." });
        });
    });
  });
}

module.exports = {
  buscarPorCEP,
  buscarPorNome,
  cadastrarEndereco,
  buscarPorId,
  atualizarEndereco,
};
