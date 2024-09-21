const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1024,
    height: 768,
    icon: 'dist/favicon.ico',
    webPreferences: {
      nodeIntegration: true,
    },
  });

  if (app.isPackaged) {
    win.loadFile('dist/index.html');
  } else {
    win.loadURL('http://localhost:5173'); // Vite dev server
  }

  /* DEBUG */
  win.webContents.openDevTools(); 
}

app.whenReady().then(createWindow);
