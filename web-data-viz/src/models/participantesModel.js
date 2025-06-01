const database = require("../database/config");

function listar() {
  const instrucaoSql = `
   SELECT  nome , email , telefone , cargo FROM usuario where empresa_idempresa = 1;
  `;
  return database.executar(instrucaoSql);
}

function deletarPorIds(ids) {
  const idsString = ids.join(',');  
  const instrucaoSql = `DELETE FROM usuario WHERE idUsuario IN (${idsString})`;
  return database.executar(instrucaoSql);
}

function editar(id, { email, telefone }) {
  const instrucaoSql = `
    UPDATE usuario 
    SET email = '${email}', telefone = '${telefone}' 
    WHERE idUsuario = ${id}
  `;
  return database.executar(instrucaoSql);
}

module.exports = {
  listar,
  deletarPorIds,
  editar
};