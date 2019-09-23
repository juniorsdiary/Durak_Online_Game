import React from 'react';
import PropTypes from 'prop-types';
import { Button, Dialog, DialogTitle } from '@material-ui/core';

const Ready = ({ activeUsers, isFull, isReady, setReadyState, textData }) => {
  return (
    <>
      <Dialog open={!activeUsers}>
        <DialogTitle>{textData[6]}</DialogTitle>
        {/* <Container>{users.join(' ')}</Container> */}
        <Button variant='contained' color='primary' disabled={isReady || !isFull} onClick={setReadyState}>
          {textData[7]}
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
  textData: PropTypes.array,
};
Ready.defaultProps = {
  activeUsers: false,
};

export default Ready;
