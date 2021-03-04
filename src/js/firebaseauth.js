function cadastra() {
    let confirmNome = false;
    let confirmSobrenome = false;
    let confirmEmail = false;
    let confirmSenha = false;

    let email = document.querySelector("#cadastro-email").value;
    let senha = document.querySelector("#cadastro-senha").value;
    let nome = document.querySelector("#nome").value;
    let sobrenome = document.querySelector("#sobrenome").value;

    if (nome == "") {
        document.querySelector("#nome-span").textContent = "Campo Obrigatorio";
        document.querySelector("#nome-span").style.display = "block";
    } else {
        document.querySelector("#nome-span").style.display = "none";
        confirmNome = true;
    }

    if (sobrenome == "") {
        document.querySelector("#sobrenome-span").textContent =
            "Campo Obrigatorio";
        document.querySelector("#sobrenome-span").style.display = "block";
    } else {
        document.querySelector("#sobrenome-span").style.display = "none";
        confirmSobrenome = true;
    }

    if (email == "") {
        document.querySelector("#cadastro-email-span").textContent =
            "Campo Obrigatorio";
        document.querySelector("#cadastro-email-span").style.display = "block";
    } else {
        document.querySelector("#cadastro-email-span").style.display = "none";
        confirmEmail = true;
    }

    if (senha == "") {
        document.querySelector("#cadastro-senha-span").textContent =
            "Campo Obrigatorio";
        document.querySelector("#cadastro-senha-span").style.display = "block";
    } else {
        document.querySelector("#cadastro-senha-span").style.display = "none";
        confirmSenha = true;
    }

    if (confirmNome && confirmSobrenome && confirmEmail && confirmSenha) {
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, senha)
            .then(() => {
                let usuario = firebase.auth().currentUser;
                alert("Id do Usuario: " + usuario.uid);
                cadastraFirebase(nome, sobrenome, email, usuario.uid);
            })
            .catch((err) => {
                let errorMessage = err.message;
                let errorCode = err.code;
                console.log(errorCode + ": " + errorMessage);
            });
    }
}

function login() {
    let email = document.querySelector("#login-email").value;
    let senha = document.querySelector("#login-senha").value;
    firebase
        .auth()
        .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        .then(() => {
            firebase
                .auth()
                .signInWithEmailAndPassword(email.toLowerCase(), senha)
                .then(() => {
                    window.location.href = "home.html";
                })
                .catch((error) => {
                    let errorCode = error.code;
                    let errorMessage = error.message;
                    alert(errorMessage + " Code: " + errorCode);
                });
        });
}

function verificaLogin(local, destino) {
    firebase.auth().onAuthStateChanged((user) => {
        let thisLocarion = __dirname + "\\";
        if (user) {
            console.log("Um usuario esta logado!");
            let uid = user.uid;

            if (
                thisLocarion + local + ".html" ==
                __dirname + "\\" + destino + ".html"
            ) {
                console.log("Ja esta na pagina!!");
            } else {
                console.log("Direcionando para o destino");
                window.location.href = destino + ".html";
            }
        } else {
            console.log("Nenhum usuario Logado");
            let thisLocarion = window.location.href;
            let host = window.location.host;
            if (thisLocarion + local + ".html" == thisLocarion + "index.html") {
                console.log("Ja esta na pagina de login");
            } else {
                window.location.href = "index.html";
            }
        }
    });
}

function verificaIqoption() {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            let uid = user.uid;
        }
    });
}

function sair() {    
    firebase
        .auth()
        .signOut()
        .then(() => {
            console.log("Usuario deslogado");
            window.location.href = "index.html";
        });
}

function cadastraFirebase(nome, sobrenome, email, uid) {
    let url =
        "http://127.0.0.1:3000/cadastra?email=" +
        email +
        "&nome=" +
        nome +
        "&sobrenome=" +
        sobrenome +
        "&uid=" +
        uid;

    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", url);
    xhttp.send();

    alert(xhttp.responseText);
}
