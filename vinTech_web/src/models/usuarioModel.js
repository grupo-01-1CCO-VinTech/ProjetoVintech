var database = require("../database/config")

function listar(email, fkEmpresa) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    console.log(email)
    var instrucao = `
    SELECT funcionario.*, nomeEmpresa FROM Funcionario, empresa where emailFuncionario = '${email}' and fkEmpresa = ${fkEmpresa} and fkEmpresa = idEmpresa;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function entrar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucao = `
        SELECT f.*, e.nomeEmpresa FROM Funcionario AS f JOIN Empresa AS e ON f.fkEmpresa = e.idEmpresa WHERE f.emailFuncionario = '${email}' AND f.senhaFuncionario = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucao
function cadastrar(id_empresa, senhaFuncionario, emailFuncionario, loginFuncionario, imagemUsuario) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():");
    var instrucao = `
        INSERT INTO Funcionario (nomeFuncionario, fkChefe, imagemUsuario, senhaFuncionario, emailFuncionario, fkempresa) VALUES ('${loginFuncionario}', null, '${imagemUsuario}', '${senhaFuncionario}', '${emailFuncionario}', ${id_empresa});
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function cadastrarFuncionarioModel(id_empresa, senhaFuncionario, emailFuncionario, nomeFuncionario, fk_Chefe) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():");
    if (fk_Chefe == 'Adm') {
        var instrucao = `
            INSERT INTO Funcionario (nomeFuncionario, fkChefe, senhaFuncionario, emailFuncionario, fkempresa) VALUES ('${nomeFuncionario}', null, '${senhaFuncionario}', '${emailFuncionario}',${id_empresa});
        `;
    } else {
        var instrucao = `
            INSERT INTO Funcionario (nomeFuncionario, fkChefe, senhaFuncionario, emailFuncionario, fkempresa) VALUES ('${nomeFuncionario}', ${fk_Chefe}, '${senhaFuncionario}', '${emailFuncionario}',${id_empresa});
        `;
    }
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function alterar(id_empresa, senhaFuncionario, emailFuncionario, nomeFuncionario, fk_Chefe, idFuncionario) {
    var instrucao = `
        update Funcionario set nomeFuncionario = '${nomeFuncionario}', fkChefe = ${fk_Chefe},
        senhaFuncionario = '${senhaFuncionario}', emailFuncionario = '${emailFuncionario}', fkEmpresa = ${id_empresa} where idFuncionario = ${idFuncionario}
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function excluir(idFunc) {
    var instrucao = `
            delete from Funcionario where idFuncionario = ${idFunc}
        `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    entrar,
    cadastrar,
    cadastrarFuncionarioModel,
    listar,
    alterar,
    excluir
};
