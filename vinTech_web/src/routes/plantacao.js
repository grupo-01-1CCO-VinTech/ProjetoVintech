var express = require("express");
var router = express.Router();

var plantacaoController = require("../controllers/plantacaoController");

router.post("/adicionar", function (req, res) {
    plantacaoController.adicionar(req, res);
})

router.post("/listar", function (req, res){
    plantacaoController.listar(req, res);
})
router.post("/consultar", function(req, res){
    plantacaoController.consultar(req,res);
})
router.post("/excluir", function(req, res){
    plantacaoController.excluir(req,res);
})
router.post("/alterar", function(req, res){
    plantacaoController.alterar(req,res);
})

module.exports = router;