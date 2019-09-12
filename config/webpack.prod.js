const paths = require('./paths');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const common = require('./webpack.config.js');

module.exports = merge(common, {
  mode: 'production',
  output: {
    path: paths.appPublic,
    filename: '[name].[hash].js',
    chunkFilename: '[name].bundle.js',
    publicPath: '/',
  },
  optimization: {
    minimizer: [new TerserPlugin()],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: paths.appHtml,
      favicon: `${paths.appSrc}/favicon.ico`,
      minify: {
        removeAttributeQuotes: true,
        collapseWhitespace: true,
        removeComments: true,
        removeScriptTypeAttributes: true,
      },
    }),
  ],
});
