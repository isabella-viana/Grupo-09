const { verificarDados } = require("../controllers/usuarioController");
var database = require("../database/config");

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha);
    
    var instrucaoSql = `
        SELECT email, senha FROM empresa WHERE email = '${email}' AND senha = '${senha}';
    `;
    
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function cadastrar(nome, email, cnpj, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, cnpj, senha);

    var instrucaoSql = `
        INSERT INTO empresa (nome, email, cnpj, senha) VALUES ('${nome}', '${email}', '${cnpj}', '${senha}');
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function verificar(estado) {
    var anos = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024];

    console.log("ACESSEI O USUARIO MODEL \n\n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n\t\t >> verifique suas credenciais de acesso ao banco\n\t\t >> e se o servidor de seu BD está rodando corretamente. ", estado);

    var instrucaoSql = `
        SELECT
            YEAR(data) AS ano,
            SUM(consumidores) AS consumidores_dezembro
        FROM consumo_energia
        WHERE
            MONTH(data) = 12
            AND YEAR(data) IN (${anos.join(",")})
            AND uf = '${estado}'
        GROUP BY YEAR(data)
        ORDER BY ano DESC;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    autenticar,
    cadastrar,
    verificar
};
