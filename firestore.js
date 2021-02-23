function banco() {
    const admin = require("firebase-admin");

    const db = admin.firestore();
    
    return db
}


module.exports = banco