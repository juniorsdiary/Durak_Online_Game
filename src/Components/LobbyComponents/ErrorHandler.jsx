import React from 'react';
import { useSelector } from 'react-redux';
import { Grow, Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  error: {
    background: 'rgba(255, 0, 0, 0.5)',
    color: 'white',
    position: 'absolute',
    top: '60px',
    padding: '1em',
    margin: '0',
    zIndex: theme.zIndex.tooltip,
  },
}));

const ErrorHandler = () => {
  const classes = useStyles();
  const { error, messageIndex } = useSelector(state => state.commonData.errorData);
  const { errors } = useSelector(state => state.commonData.typography);
  return (
    <Grow in={!!error}>
      <Grid component={Paper} item xs={10} className={classes.error}>
        {errors[messageIndex]}
      </Grid>
    </Grow>
  );
};

export default ErrorHandler;
