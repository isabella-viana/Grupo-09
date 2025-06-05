var database = require("../database/config");

function listarEnderecos(email) {
    console.log("ACESSEI O GERENCIAMENTO MODEL");
    
    // Monta SQL com filtro pelo email
    const instrucaoSql = `
    SELECT e.*, emp.nome_fantasia, u.email, u.cargo
    FROM endereco e
    LEFT JOIN empresa emp ON e.empresa_idempresa = emp.idempresa
    LEFT JOIN usuario u ON e.usuario_idUsuario = u.idUsuario
    WHERE u.email = '${email}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function removerEndereco(idendereco) {
    console.log("ACESSEI O GERENCIAMENTO MODEL - removerEndereco");

    // Monta SQL para deletar o endereço pelo ID
    const instrucaoSql = `
        DELETE FROM endereco
        WHERE idendereco = ${idendereco};
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    listarEnderecos,
    removerEndereco
};
