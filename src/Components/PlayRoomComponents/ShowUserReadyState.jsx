import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles(theme => {
  const { spacing, palette } = theme;
  return {
    user: {
      color: props => (props.active ? palette.text.primary : palette.text.secondary),
      fontWeight: props => (props.active ? 'bold' : 'normal'),
      margin: spacing(1),
    },
  };
});

const ShowUserReadyState = ({ name, active }) => {
  const classes = useStyles({ active });
  return (
    <>
      {name ? (
        <Typography variant='h6' className={classes.user}>
          {name}
        </Typography>
      ) : (
        <Skeleton variant='rect' width={100} height={32}></Skeleton>
      )}
    </>
  );
};

ShowUserReadyState.propTypes = {
  name: PropTypes.string,
  active: PropTypes.bool,
};

export default ShowUserReadyState;
