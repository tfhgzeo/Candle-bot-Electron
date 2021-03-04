require("dotenv").config();
const crypto = require("crypto");

const DADOS_CRIPTPGRAFAR = {
    algoritimo: "aes-128-cbc",
    codificacao: "utf8",
    tipo: "hex",
};

function criptografar(senha) {
    let cipher = crypto.createCipher(
        DADOS_CRIPTPGRAFAR.algoritimo,
        process.env.ENCRYPTION_KEY
    );

    cipher.update(senha);
    return cipher.final(DADOS_CRIPTPGRAFAR.tipo);
}

function descriptografar(senha) {
    let decipher = crypto.createDecipher(
        DADOS_CRIPTPGRAFAR.algoritimo,
        process.env.ENCRYPTION_KEY
    );
    decipher.update(senha, DADOS_CRIPTPGRAFAR.tipo);
    return decipher.final(DADOS_CRIPTPGRAFAR.codificacao);
}

let cript = criptografar("senha123");

console.log(cript);

let des = descriptografar(cript);

console.log(des);


console.log("Hello world!");