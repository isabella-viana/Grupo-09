var express = require("express");
var router = express.Router();

var slackController = require("../controllers/slackController");

router.post("/salvarInformacoes", function (req, res) {
    slackController.salvarInformacoes(req, res);
    console.log('Atualizando informações do slack')
})

module.exports = router;