import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
const useStyles = makeStyles({
  loaderBlock: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
});
const Loader = () => {
  const classes = useStyles();
  return <Typography className={classes.loaderBlock}>Content is loading. Please wait</Typography>;
};

Loader.propTypes = {};

export default Loader;
