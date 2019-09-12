const paths = require('./paths');
const merge = require('webpack-merge');
const common = require('./webpack.config.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = merge(common, {
  mode: 'development',
  output: {
    path: paths.appPublic,
    filename: '[name].js',
    chunkFilename: '[name].bundle.js',
    publicPath: '/',
  },
  devtool: 'source-map',
  devServer: {
    clientLogLevel: 'silent',
    compress: true,
    overlay: true,
    hot: true,
    watchContentBase: true,
    contentBase: paths.appAssets,
    historyApiFallback: true,
    noInfo: true,
    open: true,
  },
  plugins: [new HtmlWebpackPlugin({ template: paths.appHtml, inject: true, favicon: `${paths.appSrc}/favicon.ico` }), new CleanWebpackPlugin()],
});
