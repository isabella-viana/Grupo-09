var database = require("../database/config");

function buscarPorId(cnpj) {
  var instrucaoSql = `SELECT idempresa FROM empresa WHERE cnpj = '${cnpj}';`;
  return database.executar(instrucaoSql);
}

function buscarPorEmailOuUsername(email, userName) {
  var instrucaoSql = `
    SELECT idUsuario 
    FROM usuario 
    WHERE email = '${email}' OR userName = '${userName}';
  `;
  return database.executar(instrucaoSql);
}

function cadastrarUsuario(
  nome,
  contato,
  userName,
  email,
  cargo,
  senha,
  idempresa
) {
  var instrucaoSql = `
    INSERT INTO usuario (
      nome, 
      telefone, 
      userName, 
      email, 
      cargo, 
      senha, 
      empresa_idempresa
    ) VALUES (
      '${nome}', 
      '${contato}', 
      '${userName}', 
      '${email}', 
      '${cargo}', 
      '${senha}', 
      ${idempresa}
    );
  `;
  return database.executar(instrucaoSql);
}

module.exports = {
  buscarPorId,
  cadastrarUsuario,
  buscarPorEmailOuUsername,
};
