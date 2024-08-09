// main.js
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

// Enable electron-reload for hot reloading
require('electron-reload')(__dirname, {
    electron: path.join(__dirname, 'node_modules', '.bin', 'electron'),
    // 监视渲染进程文件，包括 HTML、JS 和 CSS
    watchRenderer: true
});


function createWindow() {

    const mainWindow = new BrowserWindow({
        width: 400,
        height: 300,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true, // 确保上下文隔离启用
        },
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
