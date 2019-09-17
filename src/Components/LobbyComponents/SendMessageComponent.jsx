import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';

const SendMessageComponent = ({ submit }) => {
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
    <form onSubmit={submitMessage}>
      <TextField id='message' label='Type message' value={value} onChange={changeMessage} margin='normal' autoComplete={'off'} />
    </form>
  );
};

SendMessageComponent.propTypes = {
  submit: PropTypes.func,
};

export default SendMessageComponent;
