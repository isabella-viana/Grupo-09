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

router.put("/atualizar", function (req, res) {
  enderecoController.atualizarEndereco(req, res);
});

router.get("/buscarInformacoes/:id", function (req, res) {
  enderecoController.buscarInformacoes(req, res);
});

router.get("/buscarCnpj/:id", function (req, res) {
  enderecoController.buscarCnpj(req, res);
});

module.exports = router;
