var express = require("express");
var router = express.Router();

var sensorController = require("../controllers/sensorController");

router.post("/buscarInformacoes", function (req, res) {
    sensorController.buscarInfo(req, res);
});

module.exports = router;