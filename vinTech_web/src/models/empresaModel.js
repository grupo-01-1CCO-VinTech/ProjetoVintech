var database = require("../database/config")

// function listar() {
//     console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
//     var instrucao = `
//         SELECT * FROM Funcionario;
//     `;
//     console.log("Executando a instrução SQL: \n" + instrucao);
//     return database.executar(instrucao);
// }

// function entrar(email, senha) {
//     console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
//     var instrucao = `
//         SELECT * FROM Funcionaro WHERE emailFuncionario = '${email}' AND senhaFuncionario = '${senha}';
//     `;
//     console.log("Executando a instrução SQL: \n" + instrucao);
//     return database.executar(instrucao);
// }

// Coloque os mesmos parâmetros aqui. Vá para a var instrucao
function cadastrar
    (cnpj, nomeEmpresa,  nomeFantasia,  cep, logradouro, numeroEmpresa, bairroEmpresa, 
        cidadeEmpresa, ufEmpresa, telefoneEmpresa, telefoneSecEmpresa, emailEmpresa
    ){
        console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nomeEmpresa, emailEmpresa, cnpj);
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao =
     `
        INSERT INTO Empresa 
        (
            CNPJEmpresa,
            nomeEmpresa, 
            nomeFantasia, 
            cepEmpresa, 
            logradouroEmpresa, 
            numeroLogradouro, 
            bairroEmpresa, 
            cidadeEmpresa, 
            ufEmpresa, 
            telefoneEmpresa, 
            telefoneSecEmpresa, 
            emailEmpresa
        )
        VALUES 
        (
            '${cnpj}',
            '${nomeEmpresa}',
            '${nomeFantasia}',
            '${cep}',
            '${logradouro}',
            '${numeroEmpresa}',
            '${bairroEmpresa}',
            '${cidadeEmpresa}',
            '${ufEmpresa}',
            '${telefoneEmpresa}',
            '${telefoneSecEmpresa}',
            '${emailEmpresa}'
        );
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function checar_adm(cnpj) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", cnpj)
    var instrucao = `
        SELECT idEmpresa FROM Empresa WHERE CNPJEmpresa = '${cnpj}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    // entrar,
    cadastrar,
    // listar,
    checar_adm
};