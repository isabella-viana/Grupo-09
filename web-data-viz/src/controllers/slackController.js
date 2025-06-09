var slackModel = require('../models/slackModel');


function salvarInformacoes(req, res) {
  console.log("Entrei na função salvarInformacoes do slackController");
  var slackAtivo = req.body.slackAtivo;
  var processoEtl = req.body.processoEtl;
  var processoSolicitacao = req.body.processoSolicitacao;

    console.log(
        `Recebendo as informações do slack: ${slackAtivo}, ${processoEtl}, ${processoSolicitacao}`
    );

  if (slackAtivo == undefined) {
    res.status(400).send("Nenhuma informação foi enviada!");
    console.log("slackAtivo nulo");
  } else if (processoEtl == undefined) {
    res.status(400).send("Nenhuma informação foi enviada!");
    console.log("processoEtl nulo");
  } else if (processoSolicitacao == undefined) {
    res.status(400).send("Nenhuma informação foi enviada!");
    console.log("processoSolicitacao nulo");
  } else {
    console.log("passei das validações");  

  slackModel
    .salvarInformacoes(slackAtivo, processoEtl, processoSolicitacao)
    .then(function () {
        console.log(
            `Informações do slack salvas com sucesso: ${slackAtivo}, ${processoEtl}, ${processoSolicitacao}`
        );
      res.status(200).json({ mensagem: "Acesso adicionado com sucesso!" });
    })
    .catch(function (erro) {
      console.log(erro);
      console.log(
        "\nHouve um erro ao realizar o login! Erro: ",
        erro.sqlMessage
      );
      res.status(500).json({ erro: erro.sqlMessage });
    }); 

}
}

module.exports = {
  salvarInformacoes
};