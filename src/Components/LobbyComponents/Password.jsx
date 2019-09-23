import React, { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Dialog, DialogTitle, Button, TextField } from '@material-ui/core';

const Password = ({ onClose, open, checkPass }) => {
  const [password, setPass] = useState('');
  const textData = useSelector(state => state.commonData.typography.lobbyPage);
  const join = useCallback(
    e => {
      e.preventDefault();
      checkPass(password);
    },
    [checkPass, password]
  );
  return (
    <Dialog onClose={() => onClose(false)} open={open}>
      <DialogTitle>{textData[20]}</DialogTitle>
      <form onSubmit={join}>
        <TextField type='password' required id='password' name='password' value={password} onChange={e => setPass(e.target.value)} />
        <Button variant='contained' color='primary' type='submit'>
          {textData[19]}
        </Button>
      </form>
    </Dialog>
  );
};

Password.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
  checkPass: PropTypes.func,
};

export default Password;
