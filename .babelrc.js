module.exports = function (api) {
  api.cache(true);

  const presets = ['@babel/preset-env', '@babel/preset-react'];
  const plugins = [
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-proposal-class-properties', 
    [
      '@babel/plugin-transform-runtime',
        {
          'absoluteRuntime': false,
          'regenerator': true,
        }
    ],
    [
      'babel-plugin-transform-imports',
      {
        '@material-ui/core': {
          'transform': '@material-ui/core/esm/${member}',
          'preventFullImport': true
        },
        '@material-ui/icons': {
          'transform': '@material-ui/icons/esm/${member}',
          'preventFullImport': true
        }
      }
    ],
    'react-hot-loader/babel'
  ];

  return {
    presets,
    plugins
  };
}