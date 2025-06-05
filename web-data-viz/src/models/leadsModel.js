var database = require("../database/config");

function listarPendentes() {
  var instrucaoSql = `
    SELECT id, nome_fantasia, razao_social, email, cnpj
    FROM leads
  `;
  return database.executar(instrucaoSql);
}

function EnviarSolicitacao(nome_fantasia, razao_social, email, cnpj) {
   
    console.log("Entrei no model com:", nome_fantasia, razao_social, email, cnpj);

    var instrucaoSql = `
        INSERT INTO leads (nome_fantasia, razao_social, email, cnpj, isSend)
        VALUES ('${nome_fantasia}', '${razao_social}', '${email}', '${cnpj}', false);
    `;

    console.log("Executando SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    listarPendentes,
    EnviarSolicitacao
}  