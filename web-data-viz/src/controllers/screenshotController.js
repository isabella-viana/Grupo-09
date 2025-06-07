const screenshotModel = require('../models/screenshotModel');

function listar(req, res) {
    screenshotModel.buscarEmail()
        .then(resultadoListar => {
            console.log(`Resultados encontrados: ${resultadoListar.length}`);
            
            if (resultadoListar.length > 0) {
                res.json(resultadoListar);
                
            } else {
                res.status(204).send(); // sem conteúdo
            }
        })
        .catch(erro => {
            console.error("Erro ao listar emails:", erro);
            res.status(500).json({ erro: "Erro ao listar emails." });
        });
}
module.exports = {
    listar
}