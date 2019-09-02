const path = require('path');
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
  appSrc: resolveApp('src'), // source
  appHtml: resolveApp('src/index.html'),
  appIndex: resolveApp('src/index.jsx'), // Main entry point
  appAssets: resolveApp('src/assets'), // For images and other assets
  appComponents: resolveApp('src/components'), // App source
  appStore: resolveApp('src/store'), // App source
  appPublic: resolveApp('public'), // Prod built files end up here
  appConfig: resolveApp('config'), // App config files
};
