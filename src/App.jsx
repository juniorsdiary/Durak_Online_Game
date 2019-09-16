import React from 'react';
import { hot } from 'react-hot-loader/root';
import Routes from './routes.jsx';
import { CssBaseline } from '@material-ui/core';
const App = () => (
  <>
    <CssBaseline />
    <Routes />
  </>
);
export default hot(App);
