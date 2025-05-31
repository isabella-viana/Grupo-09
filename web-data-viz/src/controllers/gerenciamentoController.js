var gerenciamentoModel = require("../models/gerenciamentoModel");

function listarEnderecos(req, res) {
    gerenciamentoModel.listarEnderecos().then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
            console.log("Consegui trazer a resposta do endereço")
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os endereços: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
    listarEnderecos
}