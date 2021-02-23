function criptografar(senha) {
    let DADOS_CRIPTPGRAFAR = {
        algoritimo: "aes-128-cbc",
        segredo: "chaves",
        tipo: "hex",
    };

    let crypto = require("crypto");
    let cipher = crypto.createCipher('aes-128-cbc', 'mypassword');

    cipher.final(senha)
    return cipher.final(DADOS_CRIPTPGRAFAR.tipo);
}

function descriptografar(senha) {}

module.exports = {
    criptografar,
    descriptografar,
};
