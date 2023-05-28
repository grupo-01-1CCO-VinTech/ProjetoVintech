var express = require("express");
var router = express.Router();

var plantacaoController = require("../controllers/plantacaoController");

router.post("/adicionar", function (req, res) {
    plantacaoController.adicionar(req, res);
})

router.post("/listar", function (req, res){
    plantacaoController.listar(req, res);
})

module.exports = router;