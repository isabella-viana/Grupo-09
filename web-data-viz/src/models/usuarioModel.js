var database = require("../database/config");

function buscarId(cnpj) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function buscarPorId(): ", cnpj);
    
    var instrucaoSql = ` SELECT idempresa FROM empresa WHERE cnpj = '${cnpj}'; `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
    
function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha);
   
    var instrucaoSql = `
        SELECT email, senha FROM usuario WHERE email = '${email}' AND senha = '${senha}';
    `;
   
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);

}

function cadastrar( idEmpresa ,nomeRepresentante, emailRepresentante, cpf, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar(): ", nomeRepresentante, emailRepresentante, cpf);
   
    var instrucaoSql = `
         INSERT INTO usuario (nome, email, cpf, senha , cargo, empresa_idempresa ) VALUES ('${nomeRepresentante}', '${emailRepresentante}' , '${cpf}', '${senha}', 'ADM', ${idEmpresa});
        ;
    `;
   
    console.log("Executando a instrução SQL para cadastrar o usuário: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    autenticar,
    cadastrar,
    buscarId
};