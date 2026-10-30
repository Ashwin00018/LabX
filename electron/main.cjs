const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,

    frame: false,
    transparent: true,
    backgroundColor: "#00000000",

    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  const isDev = !app.isPackaged;

  if (isDev) {
    win.loadURL("http://localhost:5173");
    return;
  }

  const appPath = path.join(__dirname, "..", "dist", "index.html");
  win.loadFile(appPath);
}

ipcMain.handle("close-app", () => {
  app.quit();
});

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});