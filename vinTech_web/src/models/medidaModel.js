 var database = require("../database/config");

 function buscarUltimasMedidas(idSensor, limite_linhas) {

     instrucaoSql = ''

     if (process.env.AMBIENTE_PROCESSO == "producao") {
         instrucaoSql = `select top ${limite_linhas}
         dht11_temperatura as temperatura, 
         dht11_umidade as umidade,  
                         momento,
                         FORMAT(momento, 'HH:mm:ss') as momento_grafico
                     from medida
                     where fk_aquario = ${idSensor}
                     order by id desc`;
     } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
         instrucaoSql = `select 
         temperaturaRegistro as temperatura, 
         umidadeRegistro as umidade,
                         dataRegistro
                     from registro
                     where fkSensor = ${idSensor}
                     order by idRegistro desc limit ${limite_linhas}`;
     } else {
         console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
         return
     }

     console.log("Executando a instrução SQL: \n" + instrucaoSql);
     return database.executar(instrucaoSql);
 }

 function buscarMedidasEmTempoReal(idSensor) {

     instrucaoSql = ''

     if (process.env.AMBIENTE_PROCESSO == "producao") {
         instrucaoSql = `select top 1
         dht11_temperatura as temperatura, 
         dht11_umidade as umidade,  
                         CONVERT(varchar, momento, 108) as momento_grafico, 
                         fk_aquario 
                         from medida where fk_aquario = ${idSensor} 
                     order by id desc`;

     } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
         instrucaoSql = `select 
         temperaturaRegistro as temperatura, 
         umidadeRegistro as umidade,
                         DATE_FORMAT(dataRegistro,'%H:%i:%s') as momento_grafico
                         from Registro where fkSensor = ${idSensor}
                     order by idRegistro desc limit 1;`;
     } else {
         console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
         return
     }

     console.log("Executando a instrução SQL: \n" + instrucaoSql);
     return database.executar(instrucaoSql);
 }


 module.exports = {
     buscarUltimasMedidas,
     buscarMedidasEmTempoReal
 }
