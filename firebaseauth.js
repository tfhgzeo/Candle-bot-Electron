function createUser(email, senha, nome, sobrenome) {

    let firebase = require("firebase-admin");
    let Banco = require("./firestore");
    let db = Banco();

    let { cadastra } = require("./autenticacao");

    firebase
        .auth()
        .createUserWithEmailAndPassword(email, senha)
        .then((user) => {
            let uid = user.uid;

            cadastra(db, nome, sobrenome, email, uid);
        });     
}

module.exports = {
    createUser,
};
