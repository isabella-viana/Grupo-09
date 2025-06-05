const participantesModel = require('../models/participantesModel');

function listar(req, res) {
    participantesModel.listar()
    .then(function (resultadoListar) {
        console.log(`\nResultados encontrados: ${resultadoListar.length}`);
        console.log(`Resultados: ${JSON.stringify(resultadoListar)}`);

        if (resultadoListar.length > 0) {
            res.json(resultadoListar);
        } else {
            res.status(403).send("Não foi possível encontrar dados para o estado.");
        }
    })
    .catch(function (erro) {
        console.error("Erro ao buscar dados:", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function deletar(req, res) {
    const { ids } = req.body;

    if (!Array.isArray(ids) || ids.length === 0) {
        return res.status(400).send("Lista de IDs inválida ou vazia.");
    }

    participantesModel.deletar(ids)
        .then(resultado => res.json({ mensagem: "Participantes deletados com sucesso!" }))
        .catch(erro => {
            console.error("Erro ao deletar participantes:", erro);
            res.status(500).json(erro);
        });
}

function editar(req, res) {
    const id = req.params.id;
    const { nome, email, telefone } = req.body;

    participantesModel.editar(id, nome, email, telefone)
        .then(resultado => res.json({ mensagem: "Participante editado com sucesso!" }))
        .catch(erro => {
            console.error("Erro ao editar participante:", erro);
            res.status(500).json(erro);
        });
}

module.exports = {
    listar,
    deletar,
    editar
};

