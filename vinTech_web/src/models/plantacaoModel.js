var database = require("../database/config")

function adicionar(fkEmpresa, nomePlant, cidadePlant, ufPlant) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function adicionar():", fkEmpresa);
    var instrucao = `
        INSERT INTO Plantacao (nomePlantacao, cidadePlantacao, ufPlantacao, fkEmpresa) VALUES ('${nomePlant}','${cidadePlant}','${ufPlant}','${fkEmpresa}');`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listar(id) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar(): ", id)
    var instrucao = `
    SELECT p.*, e.nomeEstufa FROM Plantacao AS p JOIN Estufa AS e ON fkPlantacao = idPlantacao WHERE fkEmpresa = '${id}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function consultar(id, nomePlant) {
    var instrucao = `
    SELECT nomePlantacao, idPlantacao, cidadePlantacao, ufPlantacao FROM Plantacao WHERE nomePlantacao = '${nomePlant}' AND fkEmpresa = ${id};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function alterar(id, fkEmpresa, nomePlant, cidadePlant, ufPlant) {
    var instrucao = `
    update plantacao set nomePlantacao = '${nomePlant}', cidadePlantacao = '${cidadePlant}', ufPlantacao = '${ufPlant}' where idPlantacao = ${id} and fkEmpresa = ${fkEmpresa}
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function excluir(id) {
    var instrucao = `
        delete from plantacao where idPlantacao = ${id};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    adicionar,
    listar,
    alterar,
    consultar,
    excluir
};