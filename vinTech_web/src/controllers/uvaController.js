var uvaModel = require("../models/uvaModel");

function adicionar(req, res) {
    fkEmpresa = req.body.fkEmpresaServer;
        uvaModel.adicionar(fkEmpresa)
}

function listar(req, res){

    uvaModel.listar().then(
        function (resultado) {
            console.log(`\nResultados encontrados: ${resultado.length}`);
            console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

            if (resultado.length > 0) {
                res.json(resultado)
            }
            else{
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