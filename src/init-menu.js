const { dialog, Menu, session } = require('electron');
const loadLocalPage = require('./load-local-page');

const menu = Menu.buildFromTemplate([
  {
    label: 'PeakRP',
    submenu: [
      {
        label: 'Reload',
        click: (menuItem, browserWindow) => {
          browserWindow.reload();
        },
      },
      {
        label: 'Clear cache',
        click: async () => {
          await session.defaultSession.clearCache();
          await dialog.showMessageBox({
            message: 'The cache has been cleared, please reload',
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
