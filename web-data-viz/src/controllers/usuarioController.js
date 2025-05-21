var usuarioModel = require("../models/usuarioModel");
var aquarioModel = require("../models/aquarioModel");

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
        console.log("parei no email do controller")
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
        console.log("Parei na senha do controller")
    } else {

        usuarioModel.autenticar(email, senha)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`);

                    if (resultadoAutenticar.length == 1) {
                        console.log(resultadoAutenticar);

                        res.json({

                            email: resultadoAutenticar[0].email,
                            senha: resultadoAutenticar[0].senha

                        });


                    } else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    console.log('Entrei na função cadastrar')
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var cnpj = req.body.cnpjServer;
    var senha = req.body.senhaServer;

    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
        console.log('aaaaa')
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
        console.log('bbbb')
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
        console.log('ccccccc')
    } else if (cnpj == undefined) {
        res.status(400).send("Seu cnpj está undefined!");
        console.log('dddddd')
    } else {
        console.log('passei das validações')

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrar(nome, email, cnpj, senha)
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
function verificarDados(req, res) {
    var estadoSelecionado = req.body.estadoServer;
    console.log("Estado selecionado: ", estadoSelecionado);

    usuarioModel.verificar(estadoSelecionado)
        .then(function (resultadoAutenticar) {
            console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
            console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`);

            if (resultadoAutenticar.length > 0) {
                
                res.json(resultadoAutenticar);
            } else {
                res.status(403).send("Não foi possível encontrar dados para o estado.");
            }
        })
        .catch(function (erro) {
            console.error("Erro ao buscar dados:", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}





module.exports = {
    autenticar,
    cadastrar,
    verificarDados
}

