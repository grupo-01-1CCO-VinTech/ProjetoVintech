var express = require("express");
var router = express.Router();

var imagensController = require("../controllers/imagensController");


router.post("/alterarImagem", function (req, res) {
    imagensController.alterarImagem(req, res);
});

// //Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
// router.post("/cadastrar", function (req, res) {
//     usuarioController.cadastrar(req, res);
// })

module.exports = router;
