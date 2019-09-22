import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogTitle, Button, TextField } from '@material-ui/core';

const Password = ({ targetRoom, requiredPassword, onClose, open, joinRoom }) => {
  const [password, setPass] = useState('');
  const [error, setError] = useState(false);
  const join = useCallback(
    e => {
      e.preventDefault();
      if (password !== requiredPassword) {
        setError(true);
      } else {
        setError(false);
        joinRoom(targetRoom);
        onClose(false);
      }
    },
    [joinRoom, onClose, password, requiredPassword, targetRoom]
  );
  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>Have password?</DialogTitle>
      <form onSubmit={join}>
        <TextField error={error} type='password' required id='password' name='password' value={password} onChange={e => setPass(e.target.value)} />
        <Button type='submit' onClick={join}>
          Join
        </Button>
      </form>
    </Dialog>
  );
};

Password.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
  joinRoom: PropTypes.func,
  requiredPassword: PropTypes.string,
  targetRoom: PropTypes.string,
};

export default Password;
