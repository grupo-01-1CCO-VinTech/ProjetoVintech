var estufaModel = require("../models/estufaModel");

function cadastrar_estufa(req, res){
    nomeEstufaServer = req.body.nomeEstufa;
    idPlantacaoServer = req.body.idPlantacao;
    tipoUvaServer = req.body.tipoUva;
    tamanhoServer = req.body.tamanho;
    console.log(req.body.tipoUva)
    estufaModel.pegar_valores_uva(tipoUvaServer)
    .then(
        function (resultado) {
            console.log(`\nResultados encontrados: ${resultado.length}`);
            console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String
            tipoUvaSelect = resultado[0].idUva
            estufaModel.pegar_valores_plantacao(idPlantacaoServer)
            .then(
                function (resultado) {
                    console.log(`\nResultados encontrados: ${resultado.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String
                    idPlantacaoSelect = resultado[0].idPlantacao
                    estufaModel.adicionar(tamanhoServer, idPlantacaoSelect, tipoUvaSelect,nomeEstufaServer)
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nEssa plantacao não existe! ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
        }
    ).catch(
        function (erro) {
            console.log(erro);
            console.log("\nEsse tipo de uva não existe! ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        }
    );
}


function listar(req, res){
    var idEmpresa = req.body.fkEmpresaServer;

    estufaModel.listar(idEmpresa).then(
        function (resultado) {
            console.log(`\nResultados encontrados: ${resultado.length}`);
            console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

            if (resultado.length > 0) {
                res.json(resultado)
            }
            else{
                res.status(403).send("Ainda nenhuma estufa cadastrada");
            }
        }
    ).catch(
        function (erro) {
            console.log(erro);
            console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        }
    );
}   

module.exports = {
    cadastrar_estufa,
    listar
}