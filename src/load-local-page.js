const path = require('path');

module.exports = (browserWindow, pageName) => {
  browserWindow.loadFile(path.join(__dirname, `pages/${pageName}.html`));
};
