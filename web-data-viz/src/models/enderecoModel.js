var database = require("../database/config");

function buscarPorCEP(cep) {
  var instrucaoSql = `SELECT * FROM endereco WHERE cep = '${cep}';`;
  return database.executar(instrucaoSql);
}

function buscarPorNome(gerente) {
  var instrucaoSql = `SELECT idUsuario FROM usuario WHERE nome LIKE '%${gerente}%';`;
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

module.exports = {
  buscarPorCEP,
  buscarPorNome,
  cadastrarEndereco,
  buscarPorId,
};
