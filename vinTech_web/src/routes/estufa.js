var express = require("express");
var router = express.Router();

var estufaController = require("../controllers/estufaController");

router.post("/adicionar", function (req, res) {
    estufaController.cadastrar_estufa(req, res)
})

router.post("/listar_plant", function (req, res) {
    estufaController.listar(req,res)
})

router.post("/consultar", function(req,res){
    estufaController.consultar(req,res)
})

router.post("/alterar", function(req, res){
    estufaController.alterar(req, res)
})

router.post("/excluir", function(req, res){
    estufaController.excluir(req, res)
})

module.exports = router;