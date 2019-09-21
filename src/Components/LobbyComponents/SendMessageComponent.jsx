import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { TextField, Container } from '@material-ui/core';

const SendMessageComponent = ({ submit, text }) => {
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
    <Container component='form' onSubmit={submitMessage}>
      <TextField
        id='message'
        label={text}
        value={value}
        onChange={changeMessage}
        margin='normal'
        autoComplete={'off'}
        fullWidth
      />
    </Container>
  );
};

SendMessageComponent.propTypes = {
  submit: PropTypes.func,
  text: PropTypes.string,
};

export default SendMessageComponent;
