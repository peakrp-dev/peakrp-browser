const { app, dialog, Menu, session } = require('electron');

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
          },
        },
      ],
    },
  ];

  const menu = Menu.buildFromTemplate(template);

  Menu.setApplicationMenu(menu);
};
