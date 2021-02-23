window.onload = () => {
    let cadastroButton = document.querySelector(".cadastro");
    let loginButton = document.querySelector(".login");

    let cadastroView = document.querySelector(".cadastro-form");
    let loginView = document.querySelector(".login-form");
    loginView.style.display = "none";
    cadastroView.style.display = "block";

    loginButton.addEventListener("click", () => {
        cadastroView.style.display = "none";
        loginView.style.display = "block";
    });

    cadastroButton.addEventListener("click", () => {
        cadastroView.style.display = "block";
        loginView.style.display = "none";
    });

    let btnCadastro = document.querySelector("#btn-cadastro");
    btnCadastro.addEventListener("click", (event) => {
        event.preventDefault();
        cadastra();
    });
};

function cadastra() {

    let confirmNome = false
    let confirmSobrenome = false
    let confirmEmail = false
    let confirmSenha = false
    
    let email = document.querySelector("#cadastro-email").value;
    let senha = document.querySelector("#cadastro-senha").value;
    let nome = document.querySelector("#nome").value;
    let sobrenome = document.querySelector("#sobrenome").value;

    if (nome == "") {
        document.querySelector("#nome-span").textContent = "Campo Obrigatorio";
        document.querySelector("#nome-span").style.display = "block";
    } else {
        document.querySelector("#nome-span").style.display = "none";
        confirmNome = true
    }

    if (sobrenome == "") {
        document.querySelector("#sobrenome-span").textContent =
            "Campo Obrigatorio";
        document.querySelector("#sobrenome-span").style.display = "block";
    } else {
        document.querySelector("#sobrenome-span").style.display = "none";
        confirmSobrenome = true
    }

    if (email == "") {
        document.querySelector("#cadastro-email-span").textContent =
            "Campo Obrigatorio";
        document.querySelector("#cadastro-email-span").style.display = "block";
    } else {
        document.querySelector("#cadastro-email-span").style.display = "none";
        confirmEmail = true
    }

    if (senha == "") {
        document.querySelector("#cadastro-senha-span").textContent =
            "Campo Obrigatorio";
        document.querySelector("#cadastro-senha-span").style.display = "block";
    } else {
        document.querySelector("#cadastro-senha-span").style.display = "none";
        confirmSenha = true
    }

    if (confirmNome && confirmSobrenome &&  confirmEmail && confirmSenha) {
        let ipc = require("electron").ipcRenderer;

        ipc.once("actionReply", function (event, response) {
            processResponse(response);
        });

        ipc.send("invokeAction", nome, sobrenome, email, senha);
    }

    
}
