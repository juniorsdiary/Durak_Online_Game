import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const SendMessage = ({ submit, textData }) => {
  const [value, setValue] = useState('');
  const changeMessage = useCallback(e => {
    setValue(e.target.value);
  }, []);
  const submitMessage = useCallback(
    e => {
      e.preventDefault();
      value && submit(value);
      setValue('');
    },
    [submit, value]
  );
  return (
    <Grid container alignItems='flex-end' justify='space-between' component='form' onSubmit={submitMessage}>
      <TextField id='message' label={textData[4]} value={value} onChange={changeMessage} autoComplete={'off'} />
      <Button variant='contained' color='secondary' type='submit'>
        {textData[3]}
      </Button>
    </Grid>
  );
};

SendMessage.propTypes = {
  submit: PropTypes.func,
  textData: PropTypes.array,
};

export default SendMessage;
