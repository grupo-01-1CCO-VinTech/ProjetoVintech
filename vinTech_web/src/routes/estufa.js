var express = require("express");
var router = express.Router();

var estufaController = require("../controllers/estufaController");

router.post("/adicionar", function (req, res) {
    estufaController.cadastrar_estufa(req, res)
})

router.post("/listar_plant", function (req, res) {
    estufaController.listar(req,res)
})

module.exports = router;