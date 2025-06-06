var usuarioModel = require("../models/usuarioModel");


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
    var cnpj = req.body.cnpj;
    var nomeRepresentante = req.body.nomeRepresentante;
    var emailRepresentante = req.body.emailRepresentante;
    var cpf = req.body.cpf;

    // Faça as validações dos valores
    if (nomeRepresentante == undefined) {
        res.status(400).send("Seu nome está undefined!");
        console.log('nomeRepresentante nulo')
    } else if (emailRepresentante == undefined) {
        res.status(400).send("Sua razao_social está undefined!");
        console.log('emailRepresentante nulo')
    }
    else if (cpf == undefined) {
        res.status(400).send("Seu cpf está undefined!");
        console.log('cpf nulo')
    } else {
        console.log('passei das validações')

         usuarioModel.buscarId(cnpj)
            .then((resultado) => {
                if (resultado.length > 0) {
                    console.log('Id encontrado:', resultado[0].idempresa);

                 var senhaAleatoria = Math.random().toString(36).slice(-8); 
                 return usuarioModel.cadastrar(resultado[0].idempresa, nomeRepresentante, emailRepresentante, cpf, senhaAleatoria)
                        .then(
                            function (resultado) {
                            res.json(resultado);
                            }
                        )
                } else {
                return res.status(409).json({ mensagem: "Não encontrei o CNPJ" });
                }
            })
            .catch((erro) => {
                console.error("Erro ao buscar CNPJ:", erro);
                res.status(500).json({ mensagem: "Erro no servidor ao buscar CNPJ." });
            });
            
        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js

    }

    
}

module.exports = {
    autenticar,
    cadastrar
}
