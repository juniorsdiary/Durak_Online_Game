import React, { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Dialog, DialogTitle, Button, TextField, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(theme => ({
  form: {
    padding: theme.spacing(1),
  },
  title: {
    padding: theme.spacing(1, 0),
    '& *': {
      textAlign: 'center',
    },
  },
}));

const Password = ({ onClose, open, checkPass }) => {
  const classes = useStyles();
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
      <DialogTitle className={classes.title}>{textData[20]}</DialogTitle>
      <Grid component='form' onSubmit={join} container direction='column' alignItems='center' className={classes.form}>
        <TextField type='password' required id='password' name='password' value={password} onChange={e => setPass(e.target.value)} margin='normal' />
        <Button variant='contained' color='primary' type='submit' margin='normal'>
          {textData[19]}
        </Button>
      </Grid>
    </Dialog>
  );
};

Password.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
  checkPass: PropTypes.func,
};

export default Password;
