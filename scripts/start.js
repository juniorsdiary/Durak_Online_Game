const webpack = require('webpack');
const WebpackDS = require('webpack-dev-server');
const config = require('../config/webpack.dev.js');
const compiler = webpack(config);
const server = new WebpackDS(compiler, config.devServer);
const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 1302;
console.log('Starting dev server...');
server.listen(DEFAULT_PORT, err => {
  if (err) {
    return console.log(err);
  }
  console.log(`Server is running at http://localhost:${DEFAULT_PORT}`);
});
