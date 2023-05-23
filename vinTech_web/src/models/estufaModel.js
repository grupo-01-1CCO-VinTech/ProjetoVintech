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

function adicionar (areaEstufa, fkPlantacao, fkUva, nomeEstufa){
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():");
    var instrucao =

        `INSERT INTO Estufa (nomeEstufa,areaEstufa, fkPlantacao, fkUva) VALUES ('${nomeEstufa}','${areaEstufa}',${fkPlantacao},${fkUva});`;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);    
}

function listar(idEmpresa) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar(): ", idEmpresa)
    var instrucao = `
        select idEstufa, nomeEstufa, nomeUva, tempMax, tempMin, umidMax, umidMin, temperaturaRegistro, umidadeRegistro, max(dataRegistro) from Estufa, Uva, Registro, empresa, 
        (select idPlantacao from plantacao, empresa where fkEmpresa = idEmpresa and idEmpresa = ${idEmpresa}) as plantaEmpresa
        where fkUva = idUva and fkSensor = idEstufa and plantaEmpresa.idPlantacao = fkPlantacao and 
        dataRegistro = (select max(dataRegistro) from registro) group by idEstufa order by dataRegistro desc;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports ={
    pegar_valores_plantacao,
    pegar_valores_uva,
    adicionar,
    listar
};