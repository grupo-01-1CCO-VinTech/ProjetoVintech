var empresaModel = require("../models/empresaModel");
var usuarioModel = require("../models/usuarioModel");

var sessoes = [];

// function testar(req, res) {
//     console.log("ENTRAMOS NA usuarioController");
//     res.json("ESTAMOS FUNCIONANDO!");
// }

// function listar(req, res) {
//     empresaModel.listar()
//         .then(function (resultado) {
//             if (resultado.length > 0) {
//                 res.status(200).json(resultado);
//             } else {
//                 res.status(204).send("Nenhum resultado encontrado!")
//             }
//         }).catch(
//             function (erro) {
//                 console.log(erro);
//                 console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
//                 res.status(500).json(erro.sqlMessage);
//             }
//         );
// }

// function entrar(req, res) {
//     var email = req.body.emailServer;
//     var senha = req.body.senhaServer;

//     if (email == undefined) {
//         res.status(400).send("Seu email está undefined!");
//     } else if (senha == undefined) {
//         res.status(400).send("Sua senha está indefinida!");
//     } else {
        
//         empresaModel.entrar(email, senha)
//             .then(
//                 function (resultado) {
//                     console.log(`\nResultados encontrados: ${resultado.length}`);
//                     console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

//                     if (resultado.length == 1) {
//                         console.log(resultado);
//                         res.json(resultado[0]);
//                     } else if (resultado.length == 0) {
//                         res.status(403).send("Email e/ou senha inválido(s)");
//                     } else {
//                         res.status(403).send("Mais de um usuário com o mesmo login e senha!");
//                     }
//                 }
//             ).catch(
//                 function (erro) {
//                     console.log(erro);
//                     console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
//                     res.status(500).json(erro.sqlMessage);
//                 }
//             );
//     }

// }

function cadastrarEmpresa(res){
    empresaModel.cadastrar(cnpj, nomeEmpresa, nomeFantasia, cep, 
        logradouro, numero, bairro, cidade, uf, telefone, telefoneSecundario, emailEmpresa)
        .then(
            function (resultado) {
                res.json(resultado);
                cadastrarAdm(res)
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao realizar o cadastro! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function cadastrarAdm(res){
    empresaModel.checar_adm(cnpj)
    .then(
        function (resultado) {
            console.log(`\nResultados encontrados: ${resultado.length}`);
            console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String
            console.log(resultado[0].idEmpresa)
            usuarioModel.cadastrar(resultado[0].idEmpresa, senhaServer, emailAdmServer, loginServer, imagemServer)
        }
    ).catch(
        function (erro) {
            console.log(erro);
            console.log("\nHouve um erro ao pegar a empresa! ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        }
    );
}

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    // var nome = req.body.nomeServer;
    // var email = req.body.emailServer;
    // var senha = req.body.senhaServer;
    // var cpf = req.body.cpfServer;
    nomeEmpresa = req.body.nomeEmpresaServer;
    nomeFantasia = req.body.nomeFantasiaServer;
    cnpj = req.body.cnpjServer;
    cep = req.body.cepServer;
    logradouro = req.body.logradouroServer;
    numero = req.body.numeroServer;
    bairro = req.body.bairroServer;
    cidade = req.body.cidadeServer;
    uf = req.body.ufServer;
    telefone = req.body.telefoneServer;
    telefoneSecundario = req.body.telefoneSecundarioServer;
    emailEmpresa = req.body.emailEmpresaServer;

    emailAdmServer= req.body.emailAdmServer;
    loginServer= req.body.loginServer;
    senhaServer= req.body.senhaServer;
    imagemServer = req.body.imagemServer;

    // Faça as validações dos valores
    // if (nome == undefined) {
    //     res.status(400).send("Seu nome está undefined!");
    // } else if(nome.length <= 1){
    //     res.status(400).send("Seu nome está muito pequeno!");
    // } else if(email.indexOf('@') == -1 || email.indexOf('.') == -1){
    //     res.status(400).send("Seu email não é válido!");
    // } else if(senha.length <= 5){
    //     res.status(400).send("Sua senha é muito fraca!");
    // } else if(cpf.length < 14 || cpf.length >= 15){
    //     res.status(400).send("Seu CPF não é válido!");
    // } else if (email == undefined) {
    //     res.status(400).send("Seu email está undefined!");
    // } else if (senha == undefined) {
    //     res.status(400).send("Sua senha está undefined!");
    // } else {
        
        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        cadastrarEmpresa(res)
    // }
}

module.exports = {
    // entrar,
    cadastrar
    // listar,
    // testar
}