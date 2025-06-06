var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

router.post("/cadastro", function (req, res) {
    usuarioController.cadastrar(req, res);
    console.log('Chegou no cadastro de usuario.js')
})

router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});

router.post("/adicionarAcesso", function (req, res) {
    usuarioController.adicionarAcesso(req, res);
});


module.exports = router;