import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
const useStyles = makeStyles({
  forbidMsg: {
    position: 'absolute',
    color: 'rgb(78, 77, 70)',
    top: '50%',
    left: '50%',
    transform: 'translate(50%, 50%)',
    width: '500px',
    height: '50px',
    textAlign: 'center',
    zIndex: '9999',
  },
});
const SystemMessage = ({ warning }) => {
  const classes = useStyles();
  return (
    <div className={classes.forbidMsg} hidden={warning}>
      It is not your turn now
    </div>
  );
};

SystemMessage.propTypes = {
  warning: PropTypes.bool,
};

export default SystemMessage;
