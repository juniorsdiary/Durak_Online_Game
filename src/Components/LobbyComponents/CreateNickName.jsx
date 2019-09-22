import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, TextField, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  form: {
    margin: 'auto',
  },
});

const CreateNickName = ({ submit, error, text, buttonText }) => {
  const [nickname, setNickname] = useState('');
  const classes = useStyles();
  return (
    <Grid
      component='form'
      className={classes.form}
      onSubmit={e => {
        e.preventDefault();
        submit(nickname);
      }}>
      <TextField
        error={Boolean(error)}
        value={nickname}
        onChange={e => setNickname(e.target.value)}
        variant='outlined'
        margin='normal'
        required
        fullWidth
        id='nickname'
        name='nickname'
        label={text}
        autoComplete='off'
      />
      <Button type='submit' fullWidth variant='contained' color='primary'>
        {buttonText}
      </Button>
    </Grid>
  );
};
CreateNickName.propTypes = {
  submit: PropTypes.func,
  error: PropTypes.string,
  buttonText: PropTypes.string,
  text: PropTypes.string,
};

CreateNickName.defaultProps = {
  submit: () => {},
  error: '',
  buttonText: 'Default Button',
  text: 'Default Text',
};

export default CreateNickName;
