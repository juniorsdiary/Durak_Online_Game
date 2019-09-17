import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography } from '@material-ui/core';

const MessageComponent = ({ nickname, msg, time }) => {
  return (
    <Grid item>
      <Typography>{nickname}</Typography>
      <Typography>{msg}</Typography>
    </Grid>
  );
};

MessageComponent.propTypes = {
  msg: PropTypes.string,
  nickname: PropTypes.string,
  time: PropTypes.string,
};

export default MessageComponent;
