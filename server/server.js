const config = require('../config/webpack.dev.js');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 3000;
const HOST = process.env.HOST || '0.0.0.0';

const devServer = new WebpackDevServer(webpack(config));

devServer.listen(DEFAULT_PORT, HOST, err => {
  if (err) {
    return console.log(err);
  }

  console.log('Starting the development server...\n');
});
