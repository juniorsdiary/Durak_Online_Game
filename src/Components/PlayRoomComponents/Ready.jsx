import React from 'react';
import PropTypes from 'prop-types';
import { Button, Dialog, DialogTitle } from '@material-ui/core';

const Ready = ({ activeUsers, isFull, isReady, setReadyState }) => {
  return (
    <>
      <Dialog open={!activeUsers}>
        <DialogTitle>Waiting for players...</DialogTitle>
        {/* <Container>{users.join(' ')}</Container> */}
        <Button variant='contained' color='primary' disabled={isReady || !isFull} onClick={setReadyState}>
          Ready
        </Button>
      </Dialog>
    </>
  );
};

Ready.propTypes = {
  isReady: PropTypes.bool,
  setReadyState: PropTypes.func,
  users: PropTypes.array,
  isUsersReady: PropTypes.bool,
  activeUsers: PropTypes.bool,
  isFull: PropTypes.bool,
};
Ready.defaultProps = {
  users: [],
  activeUsers: false,
};

export default Ready;
