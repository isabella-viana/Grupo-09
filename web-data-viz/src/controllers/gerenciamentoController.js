var gerenciamentoModel = require("../models/gerenciamentoModel");

function listarEnderecos(req, res, email) {
    gerenciamentoModel.listarEnderecos(email).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
            console.log("Consegui trazer a resposta do endereço");
        } else {
            res.status(204).send("Nenhum resultado encontrado!");
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os endereços: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function removerEndereco(req, res) {
    var idendereco = req.params.idendereco;

    gerenciamentoModel.removerEndereco(idendereco).then(function(resultado) {
        console.log(`Endereço ${idendereco} removido com sucesso.`);
        res.status(200).json({ message: "Endereço removido com sucesso." });
    }).catch(function(erro) {
        console.log(erro);
        console.log("Erro ao remover endereço: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
    listarEnderecos,
    removerEndereco
};