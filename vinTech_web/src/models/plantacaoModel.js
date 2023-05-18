function adicionar (
    fkEmpresa
){
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", fkEmpresa);

    var instrucao =

        `INSERT INTO Plantacao 
        (
            fkEmpresa
        )
        VALUES
        (
        '${fkEmpresa}'
        );`;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);    
}
function checar_adm(cnpj) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", cnpj)
    var instrucao = `
        SELECT idEmpresa FROM Empresa WHERE CNPJEmpresa = '${cnpj}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}
module.exports ={
    adicionar
};