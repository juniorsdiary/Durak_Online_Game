import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Grow from '@material-ui/core/Grow';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import CloseIcon from '@material-ui/icons/Close';

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
  closeIcon: {
    cursor: 'pointer',
  },
}));

const ErrorHandler = () => {
  const classes = useStyles();
  const { error, messageIndex } = useSelector(state => state.commonData.errorData);
  const { errors } = useSelector(state => state.commonData.typography);
  const dispatch = useDispatch();
  const closeErrorHandler = useCallback(() => {
    dispatch({ type: 'SET_ERROR', payload: { state: false, messageIndex } });
  }, [dispatch, messageIndex]);
  return (
    <Grow in={!!error}>
      <Grid component={Paper} container className={classes.error} justify='space-evenly' alignItems='center' xs={4}>
        {errors[messageIndex]}
        <CloseIcon onClick={closeErrorHandler} className={classes.closeIcon} />
      </Grid>
    </Grow>
  );
};

export default ErrorHandler;
