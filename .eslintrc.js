module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: ['react-app', 'plugin:react/recommended', 'prettier', 'prettier/react', 'plugin:jsx-a11y/recommended'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2015,
    sourceType: 'module',
  },
  plugins: ['jsx-a11y', 'react', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', 'jsx'],
      },
    ],
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: './config/webpack-common-config.js',
      },
    },
  },
};
