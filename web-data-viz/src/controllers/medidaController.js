var medidaModel = require("../models/medidaModel");

function verificarDados(req, res) {
    var estadoSelecionado = req.body.estadoServer;
    console.log("Estado selecionado: ", estadoSelecionado);

    medidaModel.verificar(estadoSelecionado)
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
function buscarClasse(req,res){
    medidaModel.buscarClasse()
    .then(function (resultadoBuscarClasse) {
        console.log(`\nResultados encontrados: ${resultadoBuscarClasse.length}`);
        console.log(`Resultados: ${JSON.stringify(resultadoBuscarClasse)}`);

        if (resultadoBuscarClasse.length > 0) {
           
            res.json(resultadoBuscarClasse);
        } else {
            res.status(403).send("Não foi possível encontrar dados");
        }
    })
    .catch(function (erro) {
        console.error("Erro ao buscar dados:", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarMapaCalor(req,res){
    console.log("Entrei no buscarMapaCalor do Model")
    medidaModel.buscarMapaCalor() 
    .then(function (resultadoMapaCalor) {
        console.log(`\nResultados encontrados: ${resultadoMapaCalor.length}`);
        console.log(`Resultados: ${JSON.stringify(resultadoMapaCalor)}`);

        if (resultadoMapaCalor.length > 0) {
           
            res.json(resultadoMapaCalor);
        } else {
            res.status(403).send("Não foi possível encontrar dados");
        }
    })
    .catch(function (erro) {
        console.error("Erro ao buscar dados:", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function verificarConsumoTodas(req,res){
        console.log("Acessei o controller do verificarConsumoTodas")

     var estadoSelecionado = req.body.estadoServer;
    console.log("Estado selecionado: ", estadoSelecionado);

    medidaModel.verificarConsumoTodas(estadoSelecionado)
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
        console.log("passei o controller do verificarConsumoTodas")
}



module.exports = {
    verificarDados,
    buscarClasse,
    buscarMapaCalor,
    verificarConsumoTodas

}








