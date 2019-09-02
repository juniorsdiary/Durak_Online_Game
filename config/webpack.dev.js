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
    publicPath: '/',
  },
  devServer: {
    port: 1302,
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
  devtool: 'eval-sourcemap',
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              config: {
                path: `${paths.appConfig}/postcss.config.js`,
              },
            },
          },
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [new HtmlWebpackPlugin({ template: paths.appHtml, favicon: `${paths.appSrc}/favicon.ico` }), new CleanWebpackPlugin()],
});
