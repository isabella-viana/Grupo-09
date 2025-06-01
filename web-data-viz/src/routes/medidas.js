var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/medidaController");

router.post("/verificar", function(req , res){
    medidaController.verificarDados(req,res)
})

router.get("/buscarClasse", function(req,res){
medidaController.buscarClasse(req,res)
})

router.get("/buscarMapaCalor", function(req,res){
medidaController.buscarMapaCalor(req,res)
})


module.exports = router;