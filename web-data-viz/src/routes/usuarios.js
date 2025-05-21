var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
    console.log('Chegou no router de cadastrar')
})

router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});

router.post("/verificar", function(req , res){
    usuarioController.verificarDados(req,res)
})

module.exports = router;