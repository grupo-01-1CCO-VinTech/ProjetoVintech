var plantacaoModel = require("../models/plantacaoModel");

function adicionar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    fkEmpresa = req.body.fkEmpresaServer;
    nomePlant = req.body.nomePlantacaoServer;
    plantacaoModel.adicionar(fkEmpresa, nomePlant)
}

function listar(req, res){
    var id = req.body.fkEmpresaServer;

    plantacaoModel.listar(id).then(
        function (resultado) {
            console.log(`\nResultados encontrados: ${resultado.length}`);
            console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

            if (resultado.length > 0) {
                res.json(resultado)
            }
            else{
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

function consultar(req, res){
    var id = req.body.fkEmpresaServer;
    var nomePlant = req.body.nomePlantacaoServer;

    plantacaoModel.consultar(id,nomePlant).then(
        function (resultado) {
            console.log(`\nResultados encontrados: ${resultado.length}`);
            console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

            if (resultado.length > 0) {
                res.json(resultado)
            }
            else{
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
function deletar(req, res){
    var id = req.body.fkEmpresaServer;
    var nomePlant = req.body.nomePlantacaoServer;

    plantacaoModel.deletar(id,nomePlant).then(
        function (resultado) {
            console.log(`\nResultados encontrados: ${resultado.length}`);
            console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

            if (resultado.length > 0) {
                res.json(resultado)
            }
            else{
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

module.exports = {
    adicionar,
    consultar,
    deletar,
    // entrar,
    // cadastrar
    listar
    // testar
}