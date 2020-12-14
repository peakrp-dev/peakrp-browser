const { app } = require('electron');
const path = require('path');

const flashVersion = '32.0.0.465';

const getPluginPath = () => {
  switch (process.platform) {
    case 'win32':
      return process.arch === 'x64'
        ? `pepflashplayer-64-${flashVersion}.dll`
        : `pepflashplayer-32-${flashVersion}.dll`;
    case 'darwin':
      return 'PepperFlashPlayer.plugin';
    case 'linux':
      return 'libpepflashplayer.so'; // not in the project yet
  }
};

module.exports = () => {
  const pluginPath = getPluginPath();

  app.commandLine.appendSwitch(
    'ppapi-flash-path',
    path.join(__dirname, 'pepper-flash-player', pluginPath),
  );

  app.commandLine.appendSwitch('ppapi-flash-version', flashVersion);
};
