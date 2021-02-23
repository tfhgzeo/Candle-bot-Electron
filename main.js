const { app, BrowserWindow } = require("electron");
const ipc = require("electron").ipcMain;
const InicializeApp = require('./inicializeApp')
InicializeApp()

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 630,
        webPreferences: {
            nodeIntegration: true,
        },
        resizable: false,
        center: true,
    });
    win.setMenuBarVisibility(false);
    win.loadFile("./src/home.html");
}

app.whenReady().then(() => {
    createWindow();
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

ipc.on("invokeAction", function (event, nome, sobrenome, email, senha) {
    console.log(nome, " ", sobrenome, " ", email, " ", senha)

    let { cadastra } = require('./autenticacao')
    let Banco = require('./firestore')
    let db = Banco()

    cadastra(db, nome, sobrenome, email, senha)
});
