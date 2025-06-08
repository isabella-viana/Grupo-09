var database = require("../database/config");

function buscarInformacoes(idEndereco) {
  var instrucao = `
    SELECT 
      e.cep,
      e.logradouro,
      e.numero,
      e.bairro,
      e.cidade,
      e.estado,
      e.apelido,
      e.complemento,
      emp.cnpj,
      u.nome AS gerente
    FROM endereco e
    JOIN empresa emp ON e.empresa_idempresa = emp.idempresa
    JOIN usuario u ON e.usuario_idUsuario = u.idUsuario
    WHERE e.idendereco = ${idEndereco};
  `;
  return database.executar(instrucao);
}

function buscarCnpj(idempresa) {
  var instrucaoSql = `SELECT cnpj FROM empresa WHERE idempresa = ${idempresa};`;
  return database.executar(instrucaoSql);
}

function buscarPorCEP(cep) {
  var instrucaoSql = `SELECT * FROM endereco WHERE cep = '${cep}';`;
  return database.executar(instrucaoSql);
}

function buscarPorNome(gerente) {
  var instrucaoSql = `SELECT idUsuario FROM usuario WHERE LOWER(nome) LIKE LOWER('%${gerente}%');`;
  return database.executar(instrucaoSql);
}

function cadastrarEndereco(
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
) {
  var instrucaoSql = `INSERT INTO endereco 
    (cep, logradouro, numero, bairro, cidade, estado, empresa_idempresa, usuario_idUsuario, complemento, apelido)
    VALUES ('${cep}', '${logradouro}', '${numeroStr}', '${bairro}', '${cidade}', '${estado}', '${idempresa}', '${idusuario}', '${complemento}', '${apelido}');`;

  return database.executar(instrucaoSql);
}

function buscarPorId(cnpj) {
  var instrucaoSql = `SELECT idempresa FROM empresa WHERE cnpj = '${cnpj}';`;
  return database.executar(instrucaoSql);
}

function atualizarEndereco(
  idEndereco,
  cep,
  logradouro,
  numero,
  bairro,
  cidade,
  estado,
  idUsuario,
  complemento,
  apelido
) {
  var instrucaoSql = `
    UPDATE endereco
    SET
      cep = '${cep}',
      logradouro = '${logradouro}',
      numero = ${numero},
      bairro = '${bairro}',
      cidade = '${cidade}',
      estado = '${estado}',
      usuario_idUsuario = '${idUsuario}',
      complemento = '${complemento}',
      apelido = '${apelido}'
    WHERE idEndereco = ${idEndereco};
  `;

  return database.executar(instrucaoSql);
}

module.exports = {
  buscarPorCEP,
  buscarPorNome,
  cadastrarEndereco,
  buscarPorId,
  atualizarEndereco,
  buscarInformacoes,
  buscarCnpj,
};
