var database = require("../database/config");

function salvarInformacoes(slackAtivo, processoEtl, processoSolicitacao) {
   
    console.log("Entrei no model com:", slackAtivo, processoEtl, processoSolicitacao);

    var instrucaoSql = `
        INSERT INTO configuracao_slack (isAtivo, processo_etl, processo_solicitacao, dataEnvio, idUsuario) VALUES
            ( '${slackAtivo}', '${processoEtl}', '${processoSolicitacao}', CURRENT_TIMESTAMP, 1);
    `;

    console.log("Executando SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    listarPendentes,
    EnviarSolicitacao
}  

module.exports = {
    salvarInformacoes
};