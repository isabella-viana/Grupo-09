const enderecoModel = require("../models/enderecoModel");
const db = require("../database/config");

exports.inserirEndereco = (req, res) => {
  const {
    cep,
    cidade,
    bairro,
    logradouro,
    numero,
    complemento,
    cnpj,
    apelido,
    gerente,
    estado,
  } = req.body;

  const sqlEmpresa = "SELECT idempresa FROM empresa WHERE cnpj = ?";
  db.query(sqlEmpresa, [cnpj], (errEmpresa, empresaRows) => {
    if (errEmpresa) {
      console.error("Erro ao buscar empresa:", errEmpresa);
      return res.status(500).json({ erro: "Erro ao buscar empresa." });
    }

    if (empresaRows.length === 0) {
      return res
        .status(404)
        .json({ erro: "Empresa com este CNPJ não encontrada." });
    }

    const empresa_idempresa = empresaRows[0].idempresa;

    const sqlUsuario =
      "SELECT idUsuario FROM usuario WHERE nome LIKE ? LIMIT 1";
    db.query(sqlUsuario, [`%${gerente}%`], (errUsuario, usuarioRows) => {
      if (errUsuario) {
        console.error("Erro ao buscar usuário:", errUsuario);
        return res.status(500).json({ erro: "Erro ao buscar gerente." });
      }

      if (usuarioRows.length === 0) {
        return res
          .status(404)
          .json({ erro: "Usuário (gerente) não encontrado." });
      }

      const usuario_idUsuario = usuarioRows[0].idUsuario;

      const dadosEndereco = {
        cep,
        cidade,
        bairro,
        logradouro,
        numero: Number(numero),
        complemento,
        apelido,
        empresa_idempresa,
        usuario_idUsuario,
        estado,
      };

      enderecoModel.inserirEndereco(dadosEndereco, (erro, resultado) => {
        if (erro) {
          console.error("Erro ao inserir endereço:", erro);
          return res.status(500).json({ erro: "Erro ao cadastrar endereço." });
        }

        res.status(201).json({ mensagem: "Endereço cadastrado com sucesso!" });
      });
    });
  });
};
