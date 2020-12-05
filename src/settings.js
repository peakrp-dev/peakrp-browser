const { app } = require('electron');
const fs = require('fs');
const path = require('path');

let settings = null;

const getSettingsPath = () => {
  const userDataPath = app.getPath('userData');
  const settingsPath = path.join(userDataPath, 'settings.json');
  return settingsPath;
};

const load = () => {
  const settingsPath = getSettingsPath();

  const settingsFileExists = fs.existsSync(settingsPath);

  const defaultSettings = {
    enableBlurryClientFix: true,
  };

  const savedSettings = settingsFileExists
    ? JSON.parse(fs.readFileSync(settingsPath))
    : {};

  settings = { ...defaultSettings, ...savedSettings };
};

const save = () => {
  const settingsPath = getSettingsPath();
  fs.writeFileSync(settingsPath, JSON.stringify(settings));
};

const get = (key) => {
  return settings[key];
};

const set = (key, value) => {
  settings[key] = value;
};

module.exports = {
  load,
  save,
  get,
  set,
};
