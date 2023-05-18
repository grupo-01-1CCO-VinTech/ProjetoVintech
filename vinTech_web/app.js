function api_julia() {
    process.env.AMBIENTE_PROCESSO = "desenvolvimento";
    // process.env.AMBIENTE_PROCESSO = "producao";

    var express = require("express");
    var cors = require("cors");
    var path = require("path");
    var PORTA = process.env.AMBIENTE_PROCESSO == "desenvolvimento" ? 3333 : 8080;

    var app = express();

    var indexRouter = require("./src/routes/index");
    var usuarioRouter = require("./src/routes/usuarios");
    var empresaRouter = require("./src/routes/empresa");
    var avisosRouter = require("./src/routes/avisos");
    var medidasRouter = require("./src/routes/medidas");
    var platacaoRouter = require("./src/routes/plantacao");

    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(express.static(path.join(__dirname, "public")));

    app.use(cors());

    app.use("/", indexRouter);
    app.use("/usuarios", usuarioRouter);
    app.use("/empresa", empresaRouter);
    app.use("/avisos", avisosRouter);
    app.use("/medidas", medidasRouter);
    app.use("/plantacao", platacaoRouter);

    app.listen(PORTA, function () {
        console.log(`Servidor do seu site já está rodando! Acesse o caminho a seguir para visualizar: http://localhost:${PORTA} \n
    Você está rodando sua aplicação em Ambiente de ${process.env.AMBIENTE_PROCESSO} \n
    Se "desenvolvimento", você está se conectando ao banco LOCAL (MySQL Workbench). \n
    Se "producao", você está se conectando ao banco REMOTO (SQL Server em nuvem Azure) \n
    Para alterar o ambiente, comente ou descomente as linhas 1 ou 2 no arquivo 'app.js'`);
    });
}

function api_marise() {
    //Iniciando os objetos das bibliotecas

    //Esse pega as porta
    const serialport = require('serialport');
    //Cria os localhost/servidor para passar informações do arduino para o html
    const express = require('express');
    //Cria o banco de dados local
    const mysql = require('mysql2');

    // Váriavel da frequencia do serial plot
    const SERIAL_BAUD_RATE = 9600;

    // Aqui a porta onde o express vai criar os servidores
    const SERVIDOR_PORTA = 3000;

    // Check para ver se pode inserir no banco de dados local
    const HABILITAR_OPERACAO_INSERIR = true;

    /*
    Fezendo uma arrow function (Uma expressão arrow function possui uma sintaxe 
    mais curta quando comparada a uma expressão de função (function expression) 
    e não tem seu próprio this, arguments, super ou new.target. Estas expressões
    de funções são melhor aplicadas para funções que não sejam métodos, e elas 
    não podem ser usadas como construtoras) assincrona (uma função assincrona é quando
    não tenho resposta na hora e eu não preciso esperar essa resposta para seguir o meu
    processamento/código)
    */
    const serial = async (
        valoresDht11Umidade,
        valoresDht11Temperatura,
        // valoresLuminosidade,
        // valoresLm35Temperatura,
        // valoresChave
    ) => {
        //Aqui está criando o banco de dados local
        const poolBancoDados = mysql.createPool(
            {
                host: 'localhost',
                port: 3306,
                user: 'aluno',
                password: 'sptech',
                database: 'Sprint3'
            }
        ).promise();

        //Aqui está vendo se o arduino está conectado em alguma das portas
        const portas = await serialport.SerialPort.list();
        const portaArduino = portas.find((porta) => porta.vendorId == 2341 && porta.productId == 43);
        if (!portaArduino) {
            throw new Error('O arduino não foi encontrado em nenhuma porta serial');
        }

        //aqui criando o objeto com as informações do arduino e da porta serial
        const arduino = new serialport.SerialPort({
            path: portaArduino.path,
            baudRate: SERIAL_BAUD_RATE
        }
        );


        //inicia a leitura da porta
        arduino.on('open', () => {
            console.log(`A leitura do arduino foi iniciada na porta ${portaArduino.path} utilizando Baud Rate de ${SERIAL_BAUD_RATE}`);
        });
        //Aqui está pegando a informação do Serial e colocando em listas
        arduino.pipe(new serialport.ReadlineParser({ delimiter: '\r\n' })).on('data', async (data) => {
            const valores = data.split(';');
            const dht11Umidade = parseFloat(valores[0]);
            const dht11Temperatura = parseFloat(valores[1]);
            // const luminosidade = parseFloat(valores[2]);
            // const lm35Temperatura = parseFloat(valores[3]);
            // const chave = parseInt(valores[4]);

            valoresDht11Umidade.push(dht11Umidade);
            valoresDht11Temperatura.push(dht11Temperatura);
            // valoresLuminosidade.push(luminosidade);
            // valoresLm35Temperatura.push(lm35Temperatura);
            // valoresChave.push(chave);

            //Isso está inserindo a informação do serial para o banco local
            if (HABILITAR_OPERACAO_INSERIR) {
                await poolBancoDados.execute(
                    // 'INSERT INTO sensores (dht11_umidade, dht11_temperatura, luminosidade, lm35_temperatura, chave) VALUES (?, ?, ?, ?, ?)',
                    // [dht11Umidade, dht11Temperatura, luminosidade, lm35Temperatura, chave]
                    'INSERT INTO Registro (temperaturaRegistro, umidadeRegistro, dataRegistro, fkSensor) VALUES (?, ?, ? ,?)',
                    [dht11Umidade, dht11Temperatura, '2023-05-13 11:10:26', 1]
                );
            }

        });

        //Aqui irá jogar um erro caso algo aconteça com o arduino
        arduino.on('error', (mensagem) => {
            console.error(`Erro no arduino (Mensagem: ${mensagem}`)
        });
    }

    //aqui vai criar apis com as informações do serial coletadas anteriormente
    const servidor = (
        valoresDht11Umidade,
        valoresDht11Temperatura,
        // valoresLuminosidade,
        // valoresLm35Temperatura,
        // valoresChave
    ) => {
        // aqui vai criar as apis baseado no sensor, como localhost:3000/sensores/dht11/umidade
        const app = express();
        app.use((request, response, next) => {
            response.header('Access-Control-Allow-Origin', '*');
            response.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
            next();
        });
        app.listen(SERVIDOR_PORTA, () => {
            console.log(`API executada com sucesso na porta ${SERVIDOR_PORTA}`);
        });
        app.get('/sensores/dht11/umidade', (_, response) => {
            return response.json(valoresDht11Umidade);
        });
        app.get('/sensores/dht11/temperatura', (_, response) => {
            return response.json(valoresDht11Temperatura);
        });
        // app.get('/sensores/luminosidade', (_, response) => {
        //     return response.json(valoresLuminosidade);
        // });
        // app.get('/sensores/lm35/temperatura', (_, response) => {
        //     return response.json(valoresLm35Temperatura);
        // });
        // app.get('/sensores/chave', (_, response) => {
        //     return response.json(valoresChave);
        //});
    }

    //Criando as listas onde os valores do sensor serão colocadas

    (async () => {
        const valoresDht11Umidade = [];
        const valoresDht11Temperatura = [];
        // const valoresLuminosidade = [];
        // const valoresLm35Temperatura = [];
        // const valoresChave = [];
        //Rodando as funções criadas anteriormente
        await serial(
            valoresDht11Umidade,
            valoresDht11Temperatura,
            // valoresLuminosidade,
            // valoresLm35Temperatura,
            // valoresChave
        );
        //servidor(
        //   valoresDht11Umidade,
        //    valoresDht11Temperatura,
            // valoresLuminosidade,
            // valoresLm35Temperatura,
            // valoresChave
        //);
    })();
}


// api_marise()
api_julia()
