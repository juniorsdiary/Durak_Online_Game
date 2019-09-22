import React from 'react';
import { hot } from 'react-hot-loader/root';
import Routes from './routes.jsx';
import { CssBaseline, Grid } from '@material-ui/core';
import { Header } from 'Components';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  wrapper: {
    height: '100vh',
  },
});

const App = () => {
  const classes = useStyles();
  return (
    <>
      <CssBaseline />
      <Grid container direction='column' className={classes.wrapper}>
        <Header />
        <Routes />
      </Grid>
    </>
  );
};
export default hot(App);
