const { app, BrowserWindow } = require("electron");
const ipc = require("electron").ipcMain;
const InicializeApp = require("./inicializeApp");
require("dotenv/config");
InicializeApp();

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 629,
        webPreferences: {
            nodeIntegration: true,
        },
        resizable: false,
        center: true,
        icon: __dirname + "/src/img/icone.jpeg",
    });
    win.setMenuBarVisibility(false);
    win.loadFile("./src/index.html");
    win.webContents.clearHistory();
    console.log(win.webContents.getURL());
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

ipc.on("cadastra", function (event, nome, sobrenome, email, uid) {
    console.log(nome, " ", sobrenome, " ", email, " ", uid);

    let { cadastra } = require("./autenticacao");

    cadastra(uid, nome, sobrenome, email);
});

ipc.on("criptografa", function (event, data) {
    let { criptografar } = require("./criptografia");

    let dataCriptografado = criptografar(data);

    event.returnValue = dataCriptografado;
});

ipc.on("descriptografa", function (event, data) {
    let { descriptografar } = require("./criptografia");

    let dataCriptografado = descriptografar(data);

    event.returnValue = dataCriptografado;
});
