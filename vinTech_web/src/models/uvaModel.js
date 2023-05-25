var database = require("../database/config")

// function adicionar(nomeUva, tempMax, tempMin, umidMax, umidMin) {
//     var instrucao =
//         `INSERT INTO Uva (nomeUva, tempMax, tempMin, umidMax, umidMin) VALUES ('${nomeUva}',${tempMax},${tempMin},${umidMax},${umidMin});`;

//     console.log("Executando a instrução SQL: \n" + instrucao);
//     return database.executar(instrucao);
// }

function listar() {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar(): ")
    var instrucao = `
        SELECT * FROM Uva;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    // adicionar,
    listar
};