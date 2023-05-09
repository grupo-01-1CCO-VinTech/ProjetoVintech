function validar() {
    txtLogin.style.borderBottom = '3px solid rgba(255, 192, 203, 0.425)'
    txtSenha.style.borderBottom = '3px solid rgba(255, 192, 203, 0.425)'
    errLogin.innerHTML = ''
    errPass.innerHTML = ''
    const login = txtLogin.value
    const senha = txtSenha.value
    var erro = false
    // verifica Login
    if (login == '') {
        erro = true
        txtLogin.placeholder = 'Informe o login!'
        txtLogin.classList.add('errWarning')
        txtLogin.style.borderBottom = '3px solid red'
    } else if (login != 'fernando.brandao@sptech.school') {
        erro = true
        txtLogin.value = ''
        txtLogin.placeholder = 'Login Inválido!'
        txtLogin.classList.add('errWarning')
        txtLogin.style.borderBottom = '3px solid red'
    }
    // verifica Senha
    if (senha == '') {
        erro = true
        txtSenha.placeholder = 'Informe a senha!'
        txtSenha.classList.add('errWarning')
        txtSenha.style.borderBottom = '3px solid red'
    }else if(senha != '123'){
        erro = true
        txtSenha.value = ''
        txtSenha.placeholder = 'Senha Inválida!'
        txtSenha.classList.add('errWarning')
        txtSenha.style.borderBottom = '3px solid red'
    }
    // verifica Erro
    if(erro == false){
        location.href = '../../ModuloDashBoard/html/index.html'
    }
}


