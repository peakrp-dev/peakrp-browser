const { app, BrowserWindow, shell } = require('electron');
const path = require('path');

const getToken = require('./get-token');
const initFlash = require('./init-flash');
const initMenu = require('./init-menu');
const loadLocalPage = require('./load-local-page');

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

initFlash();
initMenu();

const CLIENT_URL = 'https://peakrp.com/client/peakBrowser/';

const launchGame = (browserWindow) => {
  if (token === '') {
    loadLocalPage(browserWindow, 'landing-page');
    return;
  }

  browserWindow.loadURL(`${CLIENT_URL}${token}`);
};

// Start app

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 1300,
    height: 800,
    icon: path.join(__dirname, 'icons/peakrp.ico'), // TODO: Support a mac icon
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
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
    if (url.startsWith(CLIENT_URL)) {
      return;
    }

    if (url.startsWith('https://findretros.com/')) {
      return;
    }

    // Handle FindRetros voting redirect
    if (
      url.startsWith('https://peakrp.com/client') &&
      !url.startsWith(CLIENT_URL)
    ) {
      launchGame(mainWindow);
      return;
    }

    if (url.startsWith('https://peakrp.com/dc')) {
      loadLocalPage(mainWindow, 'disconnected-page');
      return;
    }

    event.preventDefault();
    shell.openExternal(url);
  });

  if (token !== '') {
    launchGame(mainWindow);
  } else {
    loadLocalPage(mainWindow, 'landing-page');
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

exports.launchGame = launchGame;
