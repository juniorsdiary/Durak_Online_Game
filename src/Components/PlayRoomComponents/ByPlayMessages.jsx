import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  logBlock: {
    position: 'absolute',
    padding: '5px',
    bottom: '10px',
    left: '10px',
    width: '18%',
    height: '30%',
    textAlign: 'justify',
    overflow: 'auto',
  },
});

const ByPlayMessages = ({ messages, textData }) => {
  const classes = useStyles();
  const renderLogMessages = messages.map((item, index) => {
    return (
      <Typography key={index}>
        {item.nickname} {textData[item.messageIndex]}
      </Typography>
    );
  });
  return (
    <Paper elevation={10} className={classes.logBlock}>
      {renderLogMessages}
    </Paper>
  );
};

ByPlayMessages.propTypes = {
  messages: PropTypes.array,
  textData: PropTypes.array,
};
ByPlayMessages.defaultProps = {
  messages: [],
};

export default ByPlayMessages;
