var leadsModel = require("../models/leadsModel");


function listarPendentes(req, res) {
  leadsModel.listarPendentes().then((resultado) => {
    res.status(200).json(resultado);
  });
}

function EnviarSolicitacao(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    console.log('Entrei na função EnviarSolicitacao');
    var nome_fantasia = req.body.nome_fantasiaVarServer;
    var razao_social = req.body.razao_socialServer;
    var email = req.body.emailServer;
    var cnpj = req.body.cnpjServer;

    // Faça as validações dos valores
    if (nome_fantasia == undefined) {
        res.status(400).send("Seu nome está undefined!");
        console.log('aaaaa')
    } else if (razao_social == undefined) {
        res.status(400).send("Sua razao_social está undefined!");
        console.log('bbbb')
    }
    else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
        console.log('cccc')
    } else if (cnpj == undefined) {
        res.status(400).send("Seu cnpj está undefined!");
        console.log('dddddd')
    } else {
        console.log('passei das validações')

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        leadsModel.EnviarSolicitacao(nome_fantasia, razao_social, email, cnpj)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}


module.exports = {
  listarPendentes,
  EnviarSolicitacao
};

