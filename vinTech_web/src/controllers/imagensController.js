var imagensModel = require("../models/imagensModel");


function alterarImagem(req, res) {
    /*Variveis com os dados do cad*/
    var imagemServer = req.body.imagemServer;
    var idUsuario = req.body.idUsuarioServer;
    
    // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
    var erro = false
    if (imagemServer == undefined) {
        erro = true
        res.status(400).send("A imagem está indefinida!");
    }

    if (erro == false) {
        imagensModel.alterarImagem(imagemServer, idUsuario)
        .then(
            function(resultado) {
                    res.json(resultado);
                }
            ).catch(
                /*Erro caso consulta */
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar a alteração! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    } else {
        res.status(400).send("Alerta! Campos inválidos encontrados, verifique o conteúdo!")
    }
}

module.exports = {
    alterarImagem
}