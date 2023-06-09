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
    var medidasRouter = require("./src/routes/medidas");
    var platacaoRouter = require("./src/routes/plantacao");
    var estufaRouter = require("./src/routes/estufa");
    var uvaRouter = require("./src/routes/uva");
    var sensorRouter = require("./src/routes/sensor");
    var imagemRouter = require("./src/routes/imagens");

    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(express.static(path.join(__dirname, "public")));

    app.use(cors());

    app.use("/", indexRouter);
    app.use("/usuarios", usuarioRouter);
    app.use("/empresa", empresaRouter);
    app.use("/medidas", medidasRouter);
    app.use("/plantacao", platacaoRouter);
    app.use("/estufa", estufaRouter);
    app.use("/uva", uvaRouter);
    app.use("/sensor", sensorRouter);
    app.use("/imagens", imagemRouter);

    app.listen(PORTA, function () {
        console.log(`Servidor do seu site já está rodando! Acesse o caminho a seguir para visualizar: http://localhost:${PORTA} \n
        Você está rodando sua aplicação em Ambiente de ${process.env.AMBIENTE_PROCESSO} \n
        Se "desenvolvimento", você está se conectando ao banco LOCAL (MySQL Workbench). \n
        Se "producao", você está se conectando ao banco REMOTO (SQL Server em nuvem Azure) \n
        Para alterar o ambiente, comente ou descomente as linhas 1 ou 2 no arquivo 'app.js'`);
    });
