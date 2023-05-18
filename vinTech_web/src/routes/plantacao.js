var express = require("express");
var router = express.Router();

var plantacaoController = require("../controllers/plantacaoController");

router.post("/adicionar", function (req, res) {
    plantacaoController.cadastrar(req, res);
})