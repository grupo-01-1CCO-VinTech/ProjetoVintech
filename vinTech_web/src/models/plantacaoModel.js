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

function consultar(id,nomePlant){
    var instrucao = `
    SELECT nomePlantacao, idPlantacao FROM Plantacao WHERE nomePlantacao = '${nomePlant}' AND fkEmpresa = ${id};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function deletar(id,nomePlant){
    var instrucao = `
    SELECT idPlantacao FROM Plantacao WHERE nomePlantacao = '${nomePlant}' AND fkEmpresa = ${id};
    `;
    var plantacao = database.executar(instrucao);
    console.log(plantacao);

    instrucao = `
    SELECT idEstufa FROM Estufa WHERE fkPlantacao = '${plantacao[0].idPlantacao}';
    `;
    var estufas = database.executar(instrucao);

    instrucao = `
    SELECT idSensor FROM Sensor WHERE fkEstufa = '${estufas[0].idEstufa}';
    `;
    var sensores = database.executar(instrucao);

    var instrucao = `
    DELETE FROM Registro WHERE fkSensor = '${sensores[0].idSensor}';
    DELETE FROM Sensor WHERE idSensor = '${sensores[0].idSensor}';
    DELETE FROM Estufa WHERE idEstufa = '${estufas[0].idEstufa}';
    DELETE FROM Plantacao WHERE fkPlantacao = '${nomePlant}';
    `
    return database.executar(instrucao);
}

module.exports = {
    adicionar,
    listar,
    deletar,
    consultar
};