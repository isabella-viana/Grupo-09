exports.inserirEndereco = (dados, callback) => {
  const sql = `
  INSERT INTO endereco 
  (cep, cidade, bairro, logradouro, numero, complemento, apelido, empresa_idempresa, usuario_idUsuario, estado)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`;

  const valores = [
    dados.cep,
    dados.cidade,
    dados.bairro,
    dados.logradouro,
    dados.numero,
    dados.complemento,
    dados.apelido,
    dados.empresa_idempresa,
    dados.usuario_idUsuario,
    dados.estado,
  ];

  db.query(sql, valores, (err, result) => {
    if (err) {
      console.error("Erro ao inserir endereço:", err);
      return callback(err);
    }
    console.log("Endereço inserido:", result);
    callback(null, result);
  });
};
