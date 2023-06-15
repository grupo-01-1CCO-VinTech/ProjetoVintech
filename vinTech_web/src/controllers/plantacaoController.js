var plantacaoModel = require("../models/plantacaoModel");

function adicionar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    fkEmpresa = req.body.fkEmpresaServer;
    nomePlant = req.body.nomePlantacaoServer;
    cidadePlant = req.body.cidadePlantacaoServer;
    ufPlant = req.body.ufPlantacaoServer;
    plantacaoModel.adicionar(fkEmpresa, nomePlant, cidadePlant, ufPlant)
}

function listar(req, res) {
    var id = req.body.fkEmpresaServer;

    plantacaoModel.listar(id).then(
        function (resultado) {
            console.log(`\nResultados encontrados: ${resultado.length}`);
            console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

            if (resultado.length > 0) {
                res.json(resultado)
            }
            else {
                res.status(403).send("Ainda nenhuma plantacao cadastrada");
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

function consultar(req, res) {
    var id = req.body.fkEmpresaServer;
    var nomePlant = req.body.nomePlantacaoServer;

    plantacaoModel.consultar(id, nomePlant).then(
        function (resultado) {
            console.log(`\nResultados encontrados: ${resultado.length}`);
            console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

            if (resultado.length > 0) {
                res.json(resultado)
            }
            else {
                res.status(403).send("Ainda nenhuma plantacao cadastrada");
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

function alterar(req, res) {
    var id = req.body.idPlantacaoServer;
    var fkEmpresa = req.body.fkEmpresaServer;
    var nomePlantacao = req.body.nomePlantacaoServer;
    var cidadePlantacao = req.body.cidadePlantacaoServer;
    var ufPlantacao = req.body.ufPlantacaoServer;

    plantacaoModel.alterar(id, fkEmpresa, nomePlantacao, cidadePlantacao, ufPlantacao).then(
        function (resultado) {
            if (resultado.ok) {
                res.json(resultado)
            }
        }
    ).catch(
        function (erro) {
            console.log(erro);
            console.log("\nHouve um erro ao realizar a alteração! Erro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        }
    );
}

function excluir(req, res) {
    var id = req.body.idPlantacaoServer;

    plantacaoModel.excluir(id).then(
        function (resultado) {
            if (resultado.ok) {
                res.json(resultado)
            }
        }
    ).catch(
        function (erro) {
            console.log(erro);
            console.log("\nHouve um erro ao realizar a exclusao! Erro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        }
    );
}
module.exports = {
    adicionar,
    consultar,
    listar,
    alterar,
    excluir
}