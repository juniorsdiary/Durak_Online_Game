import React from 'react';
import { hot } from 'react-hot-loader/root';
import Routes from './routes.jsx';
import { CssBaseline } from '@material-ui/core';
import { Header } from 'Components';

const App = () => {
  return (
    <>
      <CssBaseline />
      <Header />
      <Routes />
    </>
  );
};
export default hot(App);
