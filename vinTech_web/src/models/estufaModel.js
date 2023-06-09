var database = require("../database/config")

function pegar_valores_uva(tipoUva) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
        SELECT idUva FROM Uva WHERE nomeUva = '${tipoUva}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function pegar_valores_plantacao(idPlantacao) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
        SELECT idPlantacao FROM Plantacao WHERE idPlantacao = '${idPlantacao}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function adicionar(areaEstufa, fkPlantacao, fkUva, nomeEstufa) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():");
    var instrucao =

        `INSERT INTO Estufa (nomeEstufa,areaEstufa, fkPlantacao, fkUva) VALUES ('${nomeEstufa}','${areaEstufa}',${fkPlantacao},${fkUva});`;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listar(idEmpresa) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar(): ", idEmpresa)
    var instrucao = `
        select idEstufa, nomeEstufa, idSensor, umidadeRegistro, temperaturaRegistro, idRecente.idRegistro, nomeUva, tempMax, tempMin, umidMax, umidMin, nomePlantacao
        from registro, (select max(idregistro) as idRegistro from registro group by fkSensor) as idRecente, sensor, estufa, plantacao, empresa, uva
        where idRecente.idRegistro = registro.idRegistro and Registro.fkSensor = idSensor and fkEstufa = idEstufa and fkPlantacao = idPlantacao and fkEmpresa = ${idEmpresa} and fkUva = idUva;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function consultar(nomeEstufa) {
    var instrucao = `
    select idEstufa, nomeEstufa, nomeUva, areaEstufa from Estufa join Uva on idUva = fkUva where nomeEstufa = '${nomeEstufa}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function alterar(nomeEstufa, idUva, areaEstufa, idEstufa){
    var instrucao = `
    update Estufa set nomeEstufa = '${nomeEstufa}', fkUva = ${idUva}, areaEstufa = ${areaEstufa} where idEstufa = ${idEstufa};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function excluir(idEstufa){
    var instrucao = `
    delete from Estufa where idEstufa = ${idEstufa};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    pegar_valores_plantacao,
    pegar_valores_uva,
    adicionar,
    consultar,
    alterar,
    listar,
    excluir
};