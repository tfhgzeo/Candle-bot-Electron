function cadastra(db, nome, sobrenome, email, senha) {
    let { encrypt } = require('./teste')

    let senha_cryp = encrypt(senha);

    let ref = db.collection("users").doc();

    ref.set({
        nome: nome,
        sobrenome: sobrenome,
        email: email,
        senha: senha_cryp,
    });
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
