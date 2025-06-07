var express = require("express");
var router = express.Router();
var enderecoController = require("../controllers/contaController");

router.post("/cadastrar", function (req, res) {
  enderecoController.cadastrarUsuario(req, res);
});

module.exports = router;
