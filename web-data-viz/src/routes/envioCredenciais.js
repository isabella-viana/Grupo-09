var express = require("express");
var router = express.Router();
console.log("cheguei no router do envioCredenciais.js");
var credenciaisController = require("../../public/js/nodemailer/envioCredenciaisParaEmpresa");


router.post("/envio", function (req, res) {
   credenciaisController.enviarCredenciaisParaEmpresa(req,res)
    
})


module.exports = router;