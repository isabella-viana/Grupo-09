var database = require("../database/config");

function buscarPorId(id) {
  var instrucaoSql = `SELECT * FROM empresa WHERE idEmpresa = '${id}'`;
  return database.executar(instrucaoSql);
}

function listar() {
  var instrucaoSql = `SELECT idEmpresa, razao_social, cnpj, codigo_ativacao FROM empresa`;
  return database.executar(instrucaoSql);
}

function listarPendentes() {
  var instrucaoSql = `
    SELECT idEmpresa, nome_fantasia, email, cnpj
    FROM empresa
    WHERE situacao IS NULL OR situacao = 'Pendente'
  `;
  return database.executar(instrucaoSql);
}

function buscarPorCnpj(cnpj) {
  var instrucaoSql = `SELECT * FROM empresa WHERE cnpj = '${cnpj}'`;
  return database.executar(instrucaoSql);
}

function cadastrarEmpresa(razaoSocial, nomeFantasia, email, cnpj, senha) {
  var instrucaoSql = `
      INSERT INTO empresa (razao_social, nome_fantasia, email, cnpj, senha, situacao)
      VALUES ('${razaoSocial}', '${nomeFantasia}', '${email}', '${cnpj}', '${senha}', 'Pendente');
  `;
  return database.executar(instrucaoSql);
}

module.exports = {
  buscarPorId,
  listar,
  listarPendentes,
  buscarPorCnpj,
  cadastrarEmpresa
};
