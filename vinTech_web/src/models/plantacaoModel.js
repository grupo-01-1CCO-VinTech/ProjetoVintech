var database = require("../database/config")

function adicionar (fkEmpresa, nomePlant){
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function adicionar():", fkEmpresa);
    var instrucao =

        `INSERT INTO Plantacao (nomePlantacao, fkEmpresa) VALUES ('${nomePlant}','${fkEmpresa}');`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);    
}

function listar(id) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar(): ", id)
    var instrucao = `
        SELECT * FROM Plantacao WHERE fkEmpresa = '${id}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    adicionar,
    listar
};