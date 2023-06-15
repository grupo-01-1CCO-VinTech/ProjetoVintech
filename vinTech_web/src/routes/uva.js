var express = require("express");
var router = express.Router();

var uvaController = require("../controllers/uvaController");

// router.post("/adicionar", function (req, res) {
//     uvaController.adicionar(req, res);
// })

router.post("/listar", function (req, res){
    uvaController.listar(req, res);
})

module.exports = router;