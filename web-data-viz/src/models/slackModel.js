var database = require("../database/config");

function salvarInformacoes(slackAtivo, processoEtl, processoSolicitacao) {
   
    console.log("Entrei no model com:", slackAtivo, processoEtl, processoSolicitacao);

    var instrucaoSql = `
         UPDATE configuracao_slack
    SET isAtivo = ${slackAtivo},
        processo_etl = ${processoEtl},
        processo_solicitacao = ${processoSolicitacao},
        dataEnvio = CURRENT_TIMESTAMP
    WHERE idUsuario = 1;
    `;

    console.log("Executando SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    salvarInformacoes
};