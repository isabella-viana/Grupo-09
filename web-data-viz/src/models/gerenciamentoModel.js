var database = require("../database/config");

function listarEnderecos() {
    console.log("ACESSEI O GERENCIAMENTO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarEndereco()");
    const instrucaoSql = `
    SELECT e.*, emp.nome_fantasia, u.email, u.cargo
    FROM endereco e
    LEFT JOIN empresa emp ON e.empresa_idempresa = emp.idempresa
    LEFT JOIN usuario u ON e.usuario_idUsuario = u.idUsuario;
`;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {listarEnderecos};