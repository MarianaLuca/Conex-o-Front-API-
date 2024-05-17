var body = document.querySelector("body");
var signUpButton = document.querySelector("#signUp");
var signInButton = document.querySelector("#signIn");
var registerButton = document.querySelector("#register");
var accessButton = document.querySelector("#access");

body.onload = function(){
    body.className = "on-load";
}

signUpButton.addEventListener("click", function(){
    body.className = "sing-up";
});

signInButton.addEventListener("click", function(){
    body.className = "sing-in";
});

function isPasswordValid(password) {
    var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
}

registerButton.addEventListener("click", function(){
    var email = document.getElementById("emailCadastro").value;
    var senha = document.getElementById("senhaCadastro").value;
    var confirmarSenha = document.getElementById("confirmarSenha").value;

    if (senha !== confirmarSenha) {
        alert("As senhas não coincidem.");
        return;
    }

    if (!isPasswordValid(senha)) {
        alert("A senha deve conter pelo menos 8 caracteres, incluindo letras maiúsculas, minúsculas, números e caracteres especiais.");
        return;
    }

    fetch('https://api-umfg-programacao-iv-2024-291d5e9a4ec4.herokuapp.com/v1/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
            senha: senha
        }),
    })
    .then(response => response.json())
    .then(data => {
        window.location.href = "welcome.html";
    })
    .catch((error) => {
        console.error('Erro ao cadastrar usuário:', error);
    });
});

accessButton.addEventListener("click", function(){
    var email = document.getElementById("emailLogin").value;
    var senha = document.getElementById("senhaLogin").value;

    fetch('https://api-umfg-programacao-iv-2024-291d5e9a4ec4.herokuapp.com/v1/signin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
            senha: senha
        }),
    })
    .then(response => response.json())
    .then(data => {
        window.location.href = "welcome.html";
    })
    .catch((error) => {
        console.error('Erro ao fazer login:', error);
    });
});
