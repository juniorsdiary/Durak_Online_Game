import React from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogTitle, Typography } from '@material-ui/core';
const EndGameComponent = ({ data }) => {
  return (
    <Dialog open={data.state}>
      <DialogTitle>Game Over</DialogTitle>
      <Typography>
        {data.nickName} {data.msgIndex}
      </Typography>
    </Dialog>
  );
};

EndGameComponent.propTypes = {
  data: PropTypes.object,
};

EndGameComponent.defaultProps = {
  data: {},
};

export default EndGameComponent;
