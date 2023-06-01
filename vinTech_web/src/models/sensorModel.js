var database = require("../database/config")

function buscarInfo(idSensor) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function buscarInfo()");
    console.log(idSensor)
    var instrucao = `
        select nomeEstufa, nomeUva, umidMax,umidMin, tempMax, tempMin, nomePlantacao, localSensor, areaEstufa from Sensor
            join Estufa on fkEstufa = idEstufa
            join Plantacao on idPlantacao = fkPlantacao
            join Uva on fkUva = idUva
        where idSensor = ${idSensor};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    buscarInfo
};