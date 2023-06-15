var sensorModel = require("../models/sensorModel");

function buscarInfo(req, res) {
    /*Variveis com os dados do cad*/
    var idSensor = req.body.idSensorServer;

    sensorModel.buscarInfo(idSensor)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            /*Erro caso consulta */
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao realizar s busca! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

module.exports = {
    buscarInfo
}