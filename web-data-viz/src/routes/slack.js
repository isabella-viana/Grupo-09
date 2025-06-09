var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/slackController");

router.post("/salvarInformacoes", function (req, res) {
    usuarioController.cadastrar(req, res);
    console.log('Atualizando informações do slack')
})

module.exports = router;