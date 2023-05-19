var plantacaoModel = require("../models/plantacaoModel");

function adicionar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    // var nome = req.body.nomeServer;
    // var email = req.body.emailServer;
    // var senha = req.body.senhaServer;
    // var cpf = req.body.cpfServer;
    fkEmpresa = req.body.fkEmpresaServer;
    
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
        plantacaoModel.adicionar(fkEmpresa)
    // }
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

module.exports = {
    adicionar,
    // entrar,
    // cadastrar
    listar,
    // testar
}