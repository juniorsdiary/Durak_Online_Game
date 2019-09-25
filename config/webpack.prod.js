const paths = require('./paths');
const merge = require('webpack-merge');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const common = require('./webpack.config.js');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = merge(common, {
  mode: 'production',
  output: {
    path: paths.appPublic,
    filename: '[name].[hash].js',
    chunkFilename: '[name].bundle.js',
    publicPath: '/',
  },
  externals: {
    react: 'React',
    reactDom: 'ReactDOM',
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        react: {
          test: /[\\/]node_modules[\\/]((react).*)[\\/]/,
          name: 'react',
          chunks: 'all',
        },
        reactDom: {
          test: /[\\/]node_modules[\\/]((react-dom).*)[\\/]/,
          name: 'react-dom',
          chunks: 'all',
        },
        vendors: {
          test: /[\\/]node_modules[\\/]((?!(react|react-dom)).*)[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
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
    new BundleAnalyzerPlugin(),
    new webpack.ProvidePlugin({
      React: 'react',
    }),
  ],
});
