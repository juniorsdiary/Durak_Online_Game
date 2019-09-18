import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  logBlock: {
    position: 'absolute',
    padding: '5px',
    color: 'white',
    bottom: '10px',
    left: '10px',
    border: '1px solid white',
    width: '18%',
    height: '30%',
    background: 'rgb(128, 50, 36)',
    textAlign: 'justify',
    overflow: 'auto',
  },
});

const ByPlayMessages = ({ messages }) => {
  const classes = useStyles();
  const renderLogMessages = messages.map((item, index) => {
    return (
      <div key={index}>
        {item.nickName} {[item.msgIndex]}
      </div>
    );
  });
  return <div className={classes.logBlock}>{renderLogMessages}</div>;
};

ByPlayMessages.propTypes = {
  messages: PropTypes.array,
};
ByPlayMessages.defaultProps = {
  messages: [],
};

export default ByPlayMessages;
