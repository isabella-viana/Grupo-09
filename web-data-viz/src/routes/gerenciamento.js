var express = require("express");
var router = express.Router();

var gereciamentoController = require("../controllers/gerenciamentoController");

router.get("/listarEnderecos", function (req, res) {
    gereciamentoController.listarEnderecos(req, res);
})

module.exports = router;