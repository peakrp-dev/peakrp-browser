const { app } = require('electron');
const path = require('path');

const versions = {
  win32: {
    x64: {
      pluginPath: 'pepflashplayer64_32_0_0_363.dll',
      version: '32.0.0.363',
    },
    ia32: {
      pluginPath: 'pepflashplayer32_32_0_0_363.dll',
      version: '32.0.0.363',
    },
  },
  darwin: {
    x64: {
      pluginPath: 'PepperFlashPlayer.plugin',
      version: '30.0.0.127',
    },
    ia32: null,
  },
  linux: {
    x64: {
      pluginPath: 'libpepflashplayer-64.so',
      version: '25.0.0.127',
    },
    ia32: {
      pluginPath: 'libpepflashplayer-32.so',
      version: '25.0.0.127',
    },
  },
};

const getPlugin = () => {
  return versions[process.platform][process.arch] ?? null;
};

module.exports = () => {
  const plugin = getPlugin();

  if (plugin === null) {
    return;
  }

  const { pluginPath, version } = plugin;

  app.commandLine.appendSwitch(
    'ppapi-flash-path',
    path.join(__dirname, 'pepper-flash-player', pluginPath)
  );

  app.commandLine.appendSwitch('ppapi-flash-version', version);
};
