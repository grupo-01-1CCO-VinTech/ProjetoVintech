var database = require("../database/config")

function listar() {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
        SELECT * FROM Funcionario;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function entrar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucao = `
        SELECT * FROM Funcionario WHERE emailFuncionario = '${email}' AND senhaFuncionario = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucao
function cadastrar(id_empresa, senhaFuncionario, emailFuncionario, loginFuncionario) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():");
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
        INSERT INTO Funcionario (nomeFuncionario, fkChefe, senhaFuncionario, emailFuncionario, fkempresa) VALUES ('${loginFuncionario}', null, '${senhaFuncionario}', '${emailFuncionario}',${id_empresa});
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function cadastrarFuncionario(id_empresa, senhaFuncionario, emailFuncionario, loginFuncionario, nomeFuncionario, fk_Chefe) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():");
    if(fk_Chefe == 'Adm'){
        var instrucao = `
            INSERT INTO Funcionario (nomeFuncionario, fkChefe, senhaFuncionario, emailFuncionario, fkempresa) VALUES ('${nomeFuncionario}', null, '${senhaFuncionario}', '${emailFuncionario}',${id_empresa});
        `;
    }else{
        var instrucao = `
            INSERT INTO Funcionario (nomeFuncionario, fkChefe, senhaFuncionario, emailFuncionario, fkempresa) VALUES ('${nomeFuncionario}', ${fk_Chefe}, '${senhaFuncionario}', '${emailFuncionario}',${id_empresa});
        `;
    }
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    entrar,
    cadastrar,
    cadastrarFuncionario,
    listar,
};
