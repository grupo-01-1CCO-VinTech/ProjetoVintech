var estufaModel = require("../models/estufaModel");

function cadastrar_estufa(req, res) {
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
                            estufaModel.adicionar(tamanhoServer, idPlantacaoSelect, tipoUvaSelect, nomeEstufaServer)
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


function listar(req, res) {
    var idEmpresa = req.body.fkEmpresaServer;

    estufaModel.listar(idEmpresa).then(
        function (resultado) {
            console.log(`\nResultados encontrados: ${resultado.length}`);
            console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

            if (resultado.length > 0) {
                res.json(resultado)
            }
            else {
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

function consultar(req, res) {
    var nomeEstufa = req.body.nomeEstufaServer;
    if (nomeEstufa == undefined) {
        res.status(400).send("O nome da estufa esta Undefined!");
    } else {
        estufaModel.consultar(nomeEstufa)
            .then(function (resposta) {
                if (resposta.length == 0) {
                    res.status(403).send("Nenhuma estufa encontrada");
                }
                else {
                    res.json(resposta)
                }
            }).catch(function (erro) {
                console.log("\nHouve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            })
    }
}

function alterar(req, res) {
    var nomeEstufa = req.body.nomeEstufaServer
    var nomeUva = req.body.nomeUvaServer
    var areaEstufa = req.body.areaEstufaServer
    var idEstufa = req.body.idEstufaServer

    if (nomeEstufa == undefined) {
        res.status(400).send("O nome da estufa esta Undefined!");
    } else if (nomeUva == undefined) {
        res.status(400).send("O nome da uva esta Undefined!");
    } else if (idEstufa == undefined) {
        res.status(400).send("O id da estufa esta Undefined!");
    } else {
        estufaModel.pegar_valores_uva(nomeUva)
            .then(function (resultado) {
                idUvaSelect = resultado[0].idUva
                estufaModel.alterar(nomeEstufa, idUvaSelect, areaEstufa, idEstufa)
                    .then(function (resposta) {
                        if (resposta.ok) {
                            res.json(resposta)
                        }
                    }).catch(function (erro) {
                        console.log("\nHouve um erro ao realizar a alteração! Erro: ", erro.sqlMessage);
                        res.status(500).json(erro.sqlMessage);
                    })
            })

    }
}

module.exports = {
    cadastrar_estufa,
    consultar,
    listar,
    alterar
}