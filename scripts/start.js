const webpack = require('webpack');
const config = require('../config/webpack.dev.js');
const compiler = webpack(config);
const WebpackDS = require('webpack-dev-server');
const server = new WebpackDS(compiler, config.devServer);

const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 1302;
const HOST = process.env.HOST || '0.0.0.0';

console.log('Starting dev server...');
server.listen(DEFAULT_PORT, HOST, err => {
  if (err) {
    return console.log(err);
  }
  console.log(`Server is running at http://localhost:${DEFAULT_PORT}`);
});
