const express = require("express");
const router = express.Router();
const enderecoController = require("../controllers/enderecoController");

router.post("/", enderecoController.inserirEndereco);

module.exports = router;
