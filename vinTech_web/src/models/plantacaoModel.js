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
    var estufa = undefined
    var instrucao = `
        SELECT idPlantacao FROM Plantacao WHERE nomePlantacao = 'jundia' AND fkEmpresa = ${id};
    `;
    var plantacao = database.executar(instrucao);
    plantacao.then(
        function(resultado){
            console.log(resultado)
            if (resultado.length == 0){
                console.log('teste')
                return new Promise(() => {return 0})
            }
            instrucao = `
                SELECT idEstufa FROM Estufa WHERE fkPlantacao = '${resultado[0].idPlantacao}';
            `;
            var estufas = database.executar(instrucao);
            estufas.then(
                function(resultado){
                    estufas.then(
                        function(resultado){
                            estufa = resultado
                            instrucao = `
                                SELECT idSensor FROM Sensor WHERE fkEstufa = '${resultado[0].idEstufa}';
                            `;

                            var sensores = database.executar(instrucao);

                            sensores.then(
                                function(resultado){
                                    var instrucao = `DELETE FROM Registro WHERE fkSensor = (select fkSensor from sensor, registro where idSensor = ${resultado[0].idSensor}); DELETE FROM Sensor WHERE fkEstufa = (select fkEstufa from sensor, estufa where idEstufa = ${estufa[0].idEstufa}); DELETE FROM Estufa WHERE fkPlantacao = 1;DELETE FROM Plantacao WHERE idPlantacao = (select idPlantacao from plantacao where nomePlantacao = ${nomePlant});`
                                    return database.executar(instrucao);
                                }
                        
                            )
                
                        }
                    )
        
                }
            )
        }
    )
    return new Promise(() => {return 0})
}

module.exports = {
    adicionar,
    listar,
    deletar,
    consultar
};