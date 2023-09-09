const { app, BrowserWindow } = require("electron");
const path = require("path");

const isDev = process.env.APP_IS_DEV?.toString().trim() == "yes" ? true : false;
async function createWindow() {
  const BrowserWindowOptions = {
    width: 1200,
    minWidth: 900,
    height: 750,
    minHeight: 600,

    webPreferences: {
      nodeIntegration: true,
      devTools: isDev,
    },
    show: false,
    alwaysOnTop: true,
    frame: true,
  };

  const mainWindow = new BrowserWindow(BrowserWindowOptions);

  await mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "./dist/index.html")}`
  );

  mainWindow.show();

  mainWindow.webContents.setWindowOpenHandler((details) => {
    require('electron').shell.openExternal(details.url);
    return { action: 'deny' }
  });

  setTimeout(() => {
    mainWindow.setAlwaysOnTop(false);
  }, 1000);
}

app.whenReady().then(async () => {
  createWindow();
  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
