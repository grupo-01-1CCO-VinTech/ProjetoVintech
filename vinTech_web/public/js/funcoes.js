function validarSessao() {
    var email = sessionStorage.EMAIL_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;
    var login = sessionStorage.LOGIN_USUARIO;
    var fkChefe = sessionStorage.ID_CHEFE;
    var cargo = fkChefe != "null"?"Funcionário":"Administrador"
    var spanNomeUsuario = document.getElementById('nome_usuario');
    var spanCargoUsuario = document.getElementById('cargo_usuario')
    console.log(`Login: ${login}, Email: ${email}, Nome: ${nome}, FkChefe: ${fkChefe}`)

    if (email == undefined || nome == undefined || login == undefined) {
        window.location = "../DashboardLogin.html";
    }else{
        spanNomeUsuario.innerHTML = nome
        spanCargoUsuario.innerHTML = cargo
        var itemConfiguracoes = document.getElementById('item_config');
        if(cargo == "Funcionário"){
            itemConfiguracoes.style.display = 'none'
        }
    }
}

function limparSessao() {
    sessionStorage.clear();
    window.location = "../DashboardLogin.html";
}