import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client';
import { CssBaseline, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Header, ErrorHandler } from 'Components';
import Routes from './routes.jsx';

const useStyles = makeStyles({
  wrapper: {
    height: '100vh',
  },
});

const App = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const socket = useSelector(state => state.authentication.socket);

  useEffect(() => {
    const socket = io();
    dispatch({ type: 'SET_SOCKET', payload: socket });
  }, [dispatch]);

  return (
    <>
      <CssBaseline />
      {socket && (
        <Grid container direction='column' className={classes.wrapper} wrap='nowrap' alignItems='center'>
          <ErrorHandler />
          <Header />
          <Routes />
        </Grid>
      )}
    </>
  );
};

export default App;
