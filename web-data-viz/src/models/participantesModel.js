const database = require("../database/config");

function listar() {
    const instrucaoSql = `
        SELECT idUsuario, nome, email, telefone, cargo 
        FROM usuario 
        WHERE empresa_idempresa = 1;
    `;
    return database.executar(instrucaoSql);
}

function deletarPorId(id) {
    const instrucaoSql = `
        DELETE FROM usuario WHERE idUsuario = ?;
    `;
    return database.executar(instrucaoSql, [id]);
}

function editar(id, nome, email, telefone, cargo) {
    let campos = [];
    let valores = [];

    if (nome) {
        campos.push("nome = ?");
        valores.push(nome);
    }
    if (email) {
        campos.push("email = ?");
        valores.push(email);
    }
    if (telefone) {
        campos.push("telefone = ?");
        valores.push(telefone);
    }
    if (cargo) {
        campos.push("cargo = ?");
        valores.push(cargo);
    }

    if (campos.length === 0) {
        return Promise.reject(new Error("Nenhum campo para atualizar"));
    }

    const instrucaoSql = `UPDATE usuario SET ${campos.join(", ")} WHERE idUsuario = ?;`;
    valores.push(id);

    return database.executar(instrucaoSql, valores);
}

module.exports = {
    listar,
    deletarPorId,
    editar
};
