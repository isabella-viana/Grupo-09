var express = require("express");
var router = express.Router();

var screenshotController = require("../controllers/screenshotController");

router.post("/buscarEmails", function (req, res) {
  screenshotController.listar(req, res);

  console.log("entrei no router do screenshot")
});

module.exports = router;