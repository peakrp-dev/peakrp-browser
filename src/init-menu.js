const { app, dialog, Menu, session, shell } = require('electron');

module.exports = () => {
  const template = [
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
            // Maybe in the future, but not useful right now as there's a 20 second logout timer
            // shell.openExternal('https://peakrp.com/launchPeakBrowser');
            // app.quit();
          },
        },
      ],
    },
  ];

  const menu = Menu.buildFromTemplate(template);

  Menu.setApplicationMenu(menu);
};
