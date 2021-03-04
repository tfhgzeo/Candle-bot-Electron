window.onload = () => {
    InicializeApp();
    verificaLogin("index", "home");

    let loginBox = document.querySelector(".login-box");
    let loader = document.querySelector(".load");
    loader.style.display = "none";
    loginBox.style.display = "block";

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
        alert("Cadastrando")
        cadastra();
    });

    let btnLogin = document.querySelector("#btn-login");
    btnLogin.addEventListener("click", (event) => {
        event.preventDefault();
        login();
    });
};
