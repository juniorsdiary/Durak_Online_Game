import React from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogTitle, Typography } from '@material-ui/core';

const EndGame = ({ data, text }) => {
  const { nickName, state } = data;
  return (
    <Dialog open={state}>
      <DialogTitle>Game Over</DialogTitle>
      <Typography>
        {nickName} {text}
      </Typography>
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
