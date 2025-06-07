var express = require("express");
var router = express.Router();
var enderecoController = require("../controllers/enderecoController");

router.post("/cadastrar", function (req, res) {
  enderecoController.cadastrarEndereco(req, res);
});

router.post("/buscarId", function (req, res) {
  enderecoController.buscarPorId(req, res);
});

router.post("/buscarCep", function (req, res) {
  enderecoController.buscarPorCEP(req, res);
});

router.post("/buscarNome", function (req, res) {
  enderecoController.buscarPorNome(req, res);
});

router.post("/atualizar", function (req, res) {
  enderecoController.atualizarEndereco(req, res);
});

module.exports = router;
