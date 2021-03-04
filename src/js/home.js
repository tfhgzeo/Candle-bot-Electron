const { ipcRenderer } = require("electron");

function IniciaContainer() {
    verificaIqoption();

    let container = document.querySelector(".container");
    let load = document.querySelector(".load");
    let home = document.querySelector(".home-view");
    let btnHome = document.querySelector(".home");
    let config = document.querySelector(".config-view");
    let graphics = document.querySelector(".graphics-view");
    let btnGraphics = document.querySelector(".grafico");
    let history = document.querySelector(".history-view");
    let btnHistory = document.querySelector(".history");
    let btnInicia = document.querySelector("#inicia");
    let btnAvatar = document.querySelector("#avatarImg");
    let btnConfigurations = document.querySelector("#config-btn");
    let btnUpdateInformation = document.querySelector(".btnUpdate");

    home.style.display = "block";
    config.style.display = "none";
    graphics.style.display = "none";
    history.style.display = "none";
    load.style.display = "none";
    container.style.display = "flex";
    btnHome.style.backgroundColor = "rgb(195, 195, 195)";

    btnHome.addEventListener("click", () => {
        home.style.display = "block";
        config.style.display = "none";
        graphics.style.display = "none";
        history.style.display = "none";

        btnHome.style.backgroundColor = "rgb(195, 195, 195)";
        btnHistory.style.backgroundColor = "rgb(36, 50, 61)";
        btnGraphics.style.backgroundColor = "rgb(36, 50, 61)";
    });

    btnHistory.addEventListener("click", () => {
        home.style.display = "none";
        config.style.display = "none";
        graphics.style.display = "none";
        history.style.display = "block";

        btnHistory.style.backgroundColor = "rgb(195, 195, 195)";
        btnHome.style.backgroundColor = "rgb(36, 50, 61)";
        btnGraphics.style.backgroundColor = "rgb(36, 50, 61)";
    });

    btnGraphics.addEventListener("click", () => {
        home.style.display = "none";
        config.style.display = "none";
        graphics.style.display = "block";
        history.style.display = "none";

        btnHome.style.backgroundColor = "rgb(36, 50, 61)";
        btnHistory.style.backgroundColor = "rgb(36, 50, 61)";
        btnGraphics.style.backgroundColor = "rgb(195, 195, 195)";
    });

    btnInicia.addEventListener("click", () => {
        let lista = document.querySelector("#lista-de-sinais").value;
        let vela = document.querySelector("#velas").value;
        let entrada = document.querySelector("#valor").value;
        let gale = document.querySelector("#martingale").value;
        let loss = document.querySelector("#stopLoss").value;
        let win = document.querySelector("#stopWin").value;
        let tbody = document.querySelector("tbody");

        let node = tbody.childNodes;
        console.log(node.length);
        if (node.length != 0) {
            let trB = document.querySelectorAll(".trB");
            trB.forEach((x) => {
                x.parentNode.removeChild(x);
            });
            swal({
                title: "Login IqOption",
                text: "Informe a sua senha da IqOption",
                content: {
                    element: "input",
                    attributes: {
                        placeholder: "Digite a sua senha:",
                        type: "password",
                    },
                    button: {
                        text: "Começar",
                    },
                    button: {
                        type: "cancel",
                        text: "Cancelar",
                    },
                },
            }).then((senha) => {
                if (senha) {
                    let senhaCriptografada = ipcRenderer.sendSync(
                        "criptografa",
                        senha
                    );

                    alert(senhaCriptografada);
                    getSinais(lista, entrada);
                    chamaApi(
                        lista,
                        vela,
                        entrada,
                        gale,
                        loss,
                        win,
                        senhaCriptografada
                    );
                } else {
                    swal({
                        text: "Digite uma Senha!",
                        button: {
                            text: "Voltar",
                        },
                    });
                }
            });
        } else {
            swal({
                title: "Login IqOption",
                text: "Informe a sua senha da IqOption",
                content: {
                    element: "input",
                    attributes: {
                        placeholder: "Digite a sua senha:",
                        type: "password",
                    },
                    button: {
                        text: "Começar",
                    },
                    button: {
                        type: "cancel",
                        text: "Cancelar",
                    },
                },
            }).then((senha) => {
                if (senha) {
                    let senhaCriptografada = ipcRenderer.sendSync(
                        "criptografa",
                        senha
                    );

                    getSinais(lista, entrada);
                    chamaApi(
                        lista,
                        vela,
                        entrada,
                        gale,
                        loss,
                        win,
                        senhaCriptografada
                    );
                } else {
                    swal({
                        text: "Digite uma Senha!",
                        button: {
                            text: "Ok",
                        },
                    });
                }
            });
        }
    });

    btnAvatar.addEventListener("click", () => {
        let dropdown = document.querySelector(".dropdown-content");
        dropdown.classList.toggle("show");
    });

    btnConfigurations.addEventListener("click", () => {
        home.style.display = "none";
        config.style.display = "block";
        graphics.style.display = "none";
        history.style.display = "none";

        btnHome.style.backgroundColor = "rgb(36, 50, 61)";
    });

    btnUpdateInformation.addEventListener("click", () => {
        updateInformacoes();
    });

    window.onclick = function (event) {
        if (!event.target.matches("#avatarImg")) {
            var dropdowns = document.getElementsByClassName("dropdown-content");
            var i;
            for (i = 0; i < dropdowns.length; i++) {
                var openDropdown = dropdowns[i];
                if (openDropdown.classList.contains("show")) {
                    openDropdown.classList.remove("show");
                }
            }
        }
    };
}

function load() {
    InicializeApp();

    verificaLogin("home", "home");
    verificaValidade();
    carregaInformacoes();
    IniciaContainer();
}

function getSinais(lista, entrada) {
    let listaSplit = lista.split("\n");
    for (x in listaSplit) {
        let valores = listaSplit[x].split(",");
        createLista(valores, x, entrada);
    }
}

function createLista(lista, x, entrada) {
    let tbody = document.querySelector("#listaCorpo");
    let tr = document.createElement("tr");
    let tdHora = document.createElement("td");
    let tdMoeda = document.createElement("td");
    let tdValor = document.createElement("td");
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");

    let hora = document.createTextNode(lista[0]);
    let moeda = document.createTextNode(lista[1]);
    let valor = document.createTextNode("R$" + entrada + ".00");

    tdHora.appendChild(hora);
    tdMoeda.appendChild(moeda);
    tdValor.appendChild(valor);

    tr.appendChild(tdMoeda);
    tr.appendChild(tdHora);
    tr.appendChild(tdValor);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.id = x;
    tr.classList.add("trB");
    tbody.appendChild(tr);
}

function chamaApi(lista, vela, entrada, gale, loss, win, senha) {
    console.log(lista);

    let listaStr = "";
    let listaSplit = lista.split("\n");
    for (x in listaSplit) {
        console.log(listaStr);
        listaStr = listaStr + " " + listaSplit[x];
        listaStr = listaStr.trim();
    }

    let url =
        "http://127.0.0.1:3000/inicia_aplicacao?lista=" +
        listaStr +
        "&vela=" +
        vela +
        "&entrada=" +
        entrada +
        "&gale=" +
        gale +
        "&loss=" +
        loss +
        "&win=" +
        win +
        "&senha=" +
        senha;

    alert(url);

    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", url);
    xhttp.send();
}

function verificaIqoption() {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            let db = firebase.firestore();
            let docRef = db.collection("users").where("uid", "==", user.uid);
            docRef.get().then((snapshot) => {
                snapshot.forEach((doc) => {
                    let docId = doc.id;
                    if (doc.data().iqMail == undefined) {
                        swal({
                            title: "Conta IqOption",
                            text: "Informe o seu email da IqOption",
                            content: {
                                element: "input",
                                attributes: {
                                    placeholder: "Digite o seu Email",
                                    type: "email",
                                },
                                button: {
                                    text: "Cadastrar",
                                },
                            },
                        }).then((email) => {
                            if (email) {
                                let emailValidado = validaEmail(email);

                                if (emailValidado) {
                                    updateDoc(email, docId);
                                } else {
                                    swal({
                                        text: "Informe um email Valido",
                                        button: {
                                            text: "ok",
                                        },
                                    }).then(() => {
                                        verificaIqoption();
                                    });
                                }
                            } else {
                                verificaIqoption();
                            }
                        });
                    }
                });
            });
        }
    });
}

function updateDoc(email, docId) {
    let db = firebase.firestore();
    let docRef = db.collection("users").doc(docId);

    docRef.update({
        iqMail: email,
    });
}

function validaEmail(email) {
    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return re.test(String(email).toLowerCase());
}

function verificaValidade() {
    let db = firebase.firestore();

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            let docRef = db.collection("users").where("uid", "==", user.uid);

            docRef.get().then((snapshot) => {
                if (snapshot) {
                    snapshot.forEach((doc) => {
                        let login = doc.data().login;

                        if (login) {
                        } else {
                            swal({
                                title: "Conta Inativa",
                                button: {
                                    text: "Ok",
                                },
                            }).then(() => {
                                sair();
                            });
                        }
                    });
                }
            });
        }
    });
}

function carregaInformacoes() {
    let db = firebase.firestore();

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            let docRef = db.collection("users").where("uid", "==", user.uid);

            docRef.get().then((snapshot) => {
                snapshot.forEach((doc) => {
                    let email = document.querySelector("#config-email");
                    let emailIqOption = document.querySelector(
                        "#config-email-IqOption"
                    );
                    let nome = document.querySelector("#config-nome");
                    let sobrenome = document.querySelector("#config-sobrenome");

                    email.value = doc.data().email;
                    emailIqOption.value = doc.data().iqMail;
                    nome.value = doc.data().nome;
                    sobrenome.value = doc.data().sobrenome;
                });
            });
        }
    });
}

function updateInformacoes() {
    alert("Update");
    let email = document.querySelector("#config-email");
    let nome = document.querySelector("#config-nome");
    let sobrenome = document.querySelector("#config-sobrenome");

    let btn = document.querySelector("#btnUpdate");

    email.disabled = false;
    email.classList.add("enableInput");
}
