var express = require("express");
var router = express.Router();

var gerenciamentoController = require("../controllers/gerenciamentoController");


router.get("/listarEnderecos", function (req, res) {
    const email = req.query.email;
    gerenciamentoController.listarEnderecos(req, res, email);
    
})

router.delete("/removerEndereco/:idendereco", function (req, res) {
    gerenciamentoController.removerEndereco(req, res);
});

module.exports = router;