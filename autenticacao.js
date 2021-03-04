require("dotenv").config();

function cadastra(uid, nome, sobrenome, email) {
    let url =
        "http://" +
        process.env.API_HOST +
        ":" +
        process.env.API_PORT +
        "/cadastra?email=" +
        email +
        "&nome=" +
        nome +
        "&Sobrenome=" +
        sobrenome +
        "&uid=" +
        uid;

    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", url);
    xhttp.send();
}

// function criptografar(senha) {
//     let DADOS_CRIPTPGRAFAR = {
//         algoritimo: "aes256",
//         segredo: "chaves",
//         tipo: "hex",
//     };

//     let crypto = require("createCipher");
//     let cipher = crypto.createCipher(
//         DADOS_CRIPTPGRAFAR.algoritimo,
//         DADOS_CRIPTPGRAFAR.segredo
//     );

//     cipher.update(senha);
//     return cipher.final(DADOS_CRIPTPGRAFAR.tipo);
// }

module.exports = {
    cadastra,
};
