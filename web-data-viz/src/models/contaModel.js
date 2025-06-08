var database = require("../database/config");

function buscarPorId(idempresa) {
  var instrucaoSql = `SELECT idempresa FROM empresa WHERE cnpj = '${idempresa}';`;
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
  cpf,
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
      cpf 
      senha, 
      empresa_idempresa
    ) VALUES (
      '${nome}', 
      '${contato}', 
      '${userName}', 
      '${email}', 
      '${cargo}',
      '${cpf}',  
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
