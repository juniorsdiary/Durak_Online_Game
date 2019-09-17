import React from 'react';
import PropTypes from 'prop-types';
import { Button, Dialog, DialogTitle } from '@material-ui/core';

const ReadyComponent = ({ activeUsers, users, isReady, setReadyState }) => {
  return (
    <>
      <Dialog open={!activeUsers}>
        <DialogTitle>Waiting for players...</DialogTitle>
        {/* <Container>{users.join(' ')}</Container> */}
        {!isReady && <Button onClick={setReadyState}>Ready</Button>}
      </Dialog>
    </>
  );
};

ReadyComponent.propTypes = {
  isReady: PropTypes.bool,
  setReadyState: PropTypes.func,
  users: PropTypes.array,
  isUsersReady: PropTypes.bool,
  activeUsers: PropTypes.bool,
};
ReadyComponent.defaultProps = {
  users: [],
  activeUsers: false,
};

export default ReadyComponent;
