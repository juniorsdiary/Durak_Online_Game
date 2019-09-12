const paths = require('./paths');

module.exports = {
  entry: ['@babel/polyfill', paths.appIndex],
  resolve: {
    alias: {
      Components: `${paths.appComponents}`,
      Modules: `${paths.appModules}`,
      Store: `${paths.appStore}`,
      Assets: `${paths.appAssets}`,
      Utilities: `${paths.appUtilities}`,
      Routes: `${paths.appRoutes}`,
      'react-dom': '@hot-loader/react-dom',
    },
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: ['html-loader'],
      },
      {
        test: /\.js|jsx$/,
        use: ['babel-loader', 'stylelint-custom-processor-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.(svg|png|jpg|jpeg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'imgs',
            },
          },
          {
            loader: 'image-webpack-loader',
            options: {
              pngquant: {
                quality: '70',
                speed: 4,
              },
            },
          },
        ],
      },
      {
        test: /\.(otf|woff|woff2|ttf|eot|svg)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[hash].[ext]',
            outputPath: 'fonts',
          },
        },
      },
    ],
  },
};
