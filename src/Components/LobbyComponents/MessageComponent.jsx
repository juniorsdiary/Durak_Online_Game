import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography } from '@material-ui/core';

const MessageComponent = ({ nickname, message, time }) => {
  return (
    <Grid item>
      <Typography>{nickname}</Typography>
      <Typography>{message}</Typography>
    </Grid>
  );
};

MessageComponent.propTypes = {
  message: PropTypes.string,
  nickname: PropTypes.string,
  time: PropTypes.string,
};

export default MessageComponent;
