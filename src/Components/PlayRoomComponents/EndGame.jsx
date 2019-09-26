import React from 'react';
import PropTypes from 'prop-types';
import { LeaveRoom } from 'Components';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const EndGame = ({ data, text }) => {
  const { nickName, state } = data;
  return (
    <Dialog open={state}>
      <Grid container justify='space-around' direction='column' alignItems='center'>
        <DialogTitle>Game Over</DialogTitle>
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
