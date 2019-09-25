import React from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogTitle, Typography, Grid } from '@material-ui/core';
import { LeaveRoom } from 'Components';

const EndGame = ({ data, text }) => {
  const { nickName, state } = data;
  return (
    <Dialog open={state}>
      <DialogTitle>Game Over</DialogTitle>
      <Grid container justify='space-around'>
        <Typography variant='h5'>
          {nickName} {text}
        </Typography>
        <Typography variant='h5'>Next Game starts in 5 seconds</Typography>
        <LeaveRoom />
      </Grid>
    </Dialog>
  );
};

EndGame.propTypes = {
  data: PropTypes.object,
  text: PropTypes.string,
};

EndGame.defaultProps = {
  data: {},
};

export default EndGame;
