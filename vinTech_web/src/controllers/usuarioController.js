var usuarioModel = require("../models/usuarioModel");

var sessoes = [];

function testar(req, res) {
    console.log("ENTRAMOS NA usuarioController");
    res.json("ESTAMOS FUNCIONANDO!");
}

function listar(req, res) {
    var email = req.body.emailServer
    usuarioModel.listar(email)
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function entrar(req, res) {
    var email = req.body.loginVar;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.entrar(email, senha)
            .then(
                function (resultado) {
                    console.log(`\nResultados encontrados: ${resultado.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

                    if (resultado.length == 1) {
                        console.log(resultado);
                        res.json(resultado[0]);
                    } else if (resultado.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function cadastrar(req, res) {
    /*Variveis com os dados do cad*/
    var emailAdmServer = req.body.emailAdmServer;
    var loginAdm = req.body.loginServer;
    var senhaServer = req.body.senhaServer;
    /*
        Dicionario das variaveis
        nomeEmpresaServer: empresa.dados.nome,
        nomeFantasiaServer: empresa.dados.nomeFantasia,
        cnpjServer: empresa.dados.cnpj,
        cepServer: empresa.endereco.cep,
        logradouroServer: empresa.endereco.logradouro,
        numeroServer: empresa.endereco.numero,
        bairroServer: empresa.endereco.bairro,
        cidadeServer: empresa.endereco.cidade,
        ufServer: empresa.endereco.uf,
        telefoneServer: empresa.contato.telefone,
        telefoneSecundarioServer: empresa.contato.telefoneSecundario,
        emailEmpresaServer: empresa.contato.email,
        emailAdmServer: empresa.adm.email,
        loginServer: empresa.adm.login,
        senhaServer: empresa.adm.senha
    */
    // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
    var erro = false
    if (loginAdm.length < 8) {
        erro = true
        res.status(400).send("O campo Login deve ter pelo menos 8 caracteres!");
    }
    if (emailAdmServer == "" || emailAdmServer.indexOf('@') == -1 ||
        emailAdmServer.indexOf('.') == -1 || emailAdmServer.length < 10) {
        erro = true
        res.status(400).send("O campo E-mail deve ter um formato válido!");
    }
    if (senhaServer.length < 8) {
        erro = true
        res.status(400).send("O campo Senha deve ter pelo menos 8 caracteres!");
    }
    if (confirmarSenha != senhaServer) {
        erro = true
        res.status(400).send("As senhas não conferem!");
    }

    if (erro == false) {
        usuarioModel.cadastrar(emailAdmServer, loginAdm, senhaServer)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                /*Erro caso consulta */
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    } else {
        res.status(400).send("Alerta! Campos inválidos encontrados, verifique o conteúdo!")
    }
    /*  Código da Júlia
   if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (nome.length <= 1) {
        res.status(400).send("Seu nome está muito pequeno!");
    } else if (email.indexOf('@') == -1 || email.indexOf('.') == -1) {
        res.status(400).send("Seu email não é válido!");
    } else if (senha.length <= 5) {
        res.status(400).send("Sua senha é muito fraca!");
    } else if (cpf.length < 14 || cpf.length >= 15) {
        res.status(400).send("Seu CPF não é válido!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else {
 */
    // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
    /*  usuarioModel.cadastrar(nome, email, senha, cpf)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    } */
}

function cadastrarFuncionario(req, res) {
    /*Variveis com os dados do cad*/
    var nomeFunc = req.body.nomeFuncServer;
    var emailFunc = req.body.emailFuncServer;
    var senhaFunc = req.body.senhaFuncServer;
    var fkChefe = req.body.fkChefeServer;
    var fkEmpresa = req.body.fkEmpresaServer;
    /*
        Dicionario das variaveis
        nomeEmpresaServer: empresa.dados.nome,
        nomeFantasiaServer: empresa.dados.nomeFantasia,
        cnpjServer: empresa.dados.cnpj,
        cepServer: empresa.endereco.cep,
        logradouroServer: empresa.endereco.logradouro,
        numeroServer: empresa.endereco.numero,
        bairroServer: empresa.endereco.bairro,
        cidadeServer: empresa.endereco.cidade,
        ufServer: empresa.endereco.uf,
        telefoneServer: empresa.contato.telefone,
        telefoneSecundarioServer: empresa.contato.telefoneSecundario,
        emailEmpresaServer: empresa.contato.email,
        emailAdmServer: empresa.adm.email,
        loginServer: empresa.adm.login,
        senhaServer: empresa.adm.senha
    */
    // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
    var erro = false
    if (emailFunc == "" || emailFunc.indexOf('@') == -1 ||
        emailFunc.indexOf('.') == -1 || emailFunc.length < 10) {
        erro = true
        res.status(400).send("O campo E-mail deve ter um formato válido!");
    }
    if (senhaFunc.length < 8) {
        erro = true
        res.status(400).send("O campo Senha deve ter pelo menos 8 caracteres!");
    }

    if (erro == false) {
        usuarioModel.cadastrarFuncionarioModel(fkEmpresa, senhaFunc, emailFunc, nomeFunc, fkChefe)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                /*Erro caso consulta */
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    } else {
        res.status(400).send("Alerta! Campos inválidos encontrados, verifique o conteúdo!")
    }
}

function alterar(req, res) {
    var idFunc = req.body.idUserServer;
    var nomeFunc = req.body.nomeUserServer;
    var emailFunc = req.body.emailUserServer;
    var senhaFunc = req.body.senhaUserServer;
    var fkChefe = req.body.chefeUserServer;
    var fkEmpresa = req.body.empresaUserServer;

    usuarioModel.alterar(fkEmpresa, senhaFunc, emailFunc, nomeFunc, fkChefe, idFunc)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            /*Erro caso alterar */
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao realizar o cadastro! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

module.exports = {
    entrar,
    cadastrar,
    cadastrarFuncionario,
    listar,
    testar,
    alterar,
}