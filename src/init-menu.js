const { dialog, Menu, session } = require('electron');
const loadLocalPage = require('./load-local-page');

const menu = Menu.buildFromTemplate([
  {
    label: 'PeakRP',
    submenu: [
      {
        label: 'Clear cache',
        click: async () => {
          await session.defaultSession.clearCache();
          await dialog.showMessageBox({
            message: 'The cache has been cleared, please restart the game',
          });
        },
      },
    ],
  },
  {
    label: 'Development',
    submenu: [
      {
        label: 'Open DevTools',
        click: (menuItem, browserWindow) => {
          browserWindow.webContents.openDevTools();
        },
      },
      {
        label: 'Go to disconnect page',
        click: (menuItem, browserWindow) => {
          loadLocalPage(browserWindow, 'disconnected-page');
        },
      },
    ],
  },
]);

module.exports = () => {
  Menu.setApplicationMenu(menu);
};
