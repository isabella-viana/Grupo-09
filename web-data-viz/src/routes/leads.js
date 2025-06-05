var express = require("express");
var router = express.Router();

var leadsController = require("../controllers/leadsController");


router.post("/EnviarSolicitacao", function (req, res) {
    leadsController.EnviarSolicitacao(req, res);
})

router.get("/pendentes", function (req, res) {
  leadsController.listarPendentes(req, res);
});

module.exports = router;