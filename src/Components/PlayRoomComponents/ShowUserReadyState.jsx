import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Skeleton from '@material-ui/lab/Skeleton';
import Typography from '@material-ui/core/Typography';

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

const ShowUserReadyState = ({ nickname, active }) => {
  const classes = useStyles({ active });
  return (
    <>
      {nickname ? (
        <Typography variant='h6' className={classes.user}>
          {nickname}
        </Typography>
      ) : (
        <Skeleton className={classes.user} variant='rect' width={100} height={32}></Skeleton>
      )}
    </>
  );
};

ShowUserReadyState.propTypes = {
  nickname: PropTypes.string,
  active: PropTypes.bool,
};

export default ShowUserReadyState;
