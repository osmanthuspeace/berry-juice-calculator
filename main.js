const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('node:path');

require('electron-reload')(__dirname, {
    electron: path.join(__dirname, 'node_modules', '.bin', 'electron'),
    watchRenderer: true
});


function createWindow() {

    const mainWindow = new BrowserWindow({
        width: 500,
        height: 700,
        minWidth: 305,
        minHeight: 500,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true, // 确保上下文隔离启用
        },
        titleBarStyle: 'hiddenInset'
    });

    mainWindow.loadFile('index.html').then();

}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
