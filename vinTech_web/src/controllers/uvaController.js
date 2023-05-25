var uvaModel = require("../models/uvaModel");

// function adicionar(req, res) {
//     var nomeUva = req.body.nomeUva;
//     var tempMax = req.body.tempMax;
//     var tempMin = req.body.tempMin;
//     var umidMax = req.body.umidMax;
//     var umidMin = req.body.umidMin;
//     uvaModel.adicionar(nomeUva, tempMax, tempMin, umidMax, umidMin)
//     .then(
//         function (resultado) {
//             console.log(resultado)
//         }
//     ).catch(
//         function (erro) {
//             console.log(erro);
//             console.log("\nHouve um erro ao realizar o cadastro das uvas! Erro: ", erro.sqlMessage);
//             res.status(500).json(erro.sqlMessage);
//         }
//     );
// }

function listar(req, res) {

    uvaModel.listar().then(
        function (resultado) {
            console.log(`\nResultados encontrados: ${resultado.length}`);
            console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

            if (resultado.length > 0) {
                res.json(resultado)
            }
            else {
                res.status(403).send("Ainda nenhuma uva cadastrada");
            }
        }
    ).catch(
        function (erro) {
            console.log(erro);
            console.log("\nHouve um erro ao consultar as uvas! Erro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        }
    );
}

module.exports = {
    adicionar,
    listar
}