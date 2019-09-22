import React from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogTitle, Typography } from '@material-ui/core';
const EndGame = ({ data }) => {
  return (
    <Dialog open={data.state}>
      <DialogTitle>Game Over</DialogTitle>
      <Typography>
        {data.nickName} {data.msgIndex}
      </Typography>
    </Dialog>
  );
};

EndGame.propTypes = {
  data: PropTypes.object,
};

EndGame.defaultProps = {
  data: {},
};

export default EndGame;
