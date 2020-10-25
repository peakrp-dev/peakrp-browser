const { app, BrowserWindow, shell } = require('electron');
const path = require('path');
const initFlash = require('./init-flash');
const getToken = require('./get-token');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  // eslint-disable-line global-require
  app.quit();
}

// Authentication

let token = '';

// Catch peakrp:// parameters on mac
app.on('open-url', (event, data) => {
  token = getToken(data);
});

app.setAsDefaultProtocolClient('peakrp');

// Flash

initFlash(app);

// Start app

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 1300,
    height: 800,
    icon: path.join(__dirname, 'icons/peakrp.ico'), // TODO: Support a mac icon
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
      plugins: true,
    },
  });

  // Catch peakrp:// parameters on windows
  if (process.platform === 'win32') {
    const args = process.argv;

    if (args.length >= 2) {
      token = getToken(args[1]);
    }
  }

  mainWindow.webContents.on('will-navigate', (event, url) => {
    event.preventDefault();
    shell.openExternal(url);
  });

  if (token !== '') {
    mainWindow.loadURL(`https://peakrp.com/client/peakBrowser/${token}`);
  } else {
    mainWindow.loadFile(path.join(__dirname, 'landing-page/index.html'));
  }
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
