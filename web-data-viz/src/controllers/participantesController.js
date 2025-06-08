const participantesModel = require('../models/participantesModel');

function listar(req, res) {
   var empresa= req.body.idEmpresaServer
    participantesModel.listar(empresa)
        .then(resultadoListar => {
            console.log(`Resultados encontrados: ${resultadoListar.length}`);
            if (resultadoListar.length > 0) {
                res.json(resultadoListar);
            } else {
                res.status(204).send(); // sem conteúdo
            }
        })
        .catch(erro => {
            console.error("Erro ao listar participantes:", erro);
            res.status(500).json({ erro: "Erro ao listar participantes." });
        });
}

function deletar(req, res) {
    const id = req.params.id;

    if (!id) {
        return res.status(400).json({ erro: "ID não fornecido." });
    }

    participantesModel.deletarPorId(id)
        .then(() => {
            res.json({ mensagem: "Participante deletado com sucesso!" });
        })
        .catch(erro => {
            console.error("Erro ao deletar participante:", erro);
            res.status(500).json({ erro: "Erro ao deletar participante.", detalhes: erro.sqlMessage || erro.message });
        });
}

function editar(req, res) {
    const id = req.params.id;
    const { nome, email, telefone, cargo } = req.body;

   
    if (!nome && !email && !telefone && !cargo) {
        return res.status(400).json({ erro: "Nenhum dado para atualizar." });
    }

    participantesModel.editar(id, nome, email, telefone, cargo)
        .then(() => res.json({ mensagem: "Participante editado com sucesso!" }))
        .catch(erro => {
            console.error("Erro ao editar participante:", erro);
            res.status(500).json({ erro: "Erro ao editar participante." });
        });
}

module.exports = {
    listar,
    deletar,
    editar
};
