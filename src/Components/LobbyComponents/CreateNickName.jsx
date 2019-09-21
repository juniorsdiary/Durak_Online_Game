import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, TextField } from '@material-ui/core';

export default function CreateNickName({ submit, error, text, buttonText }) {
  const [nickname, setNickname] = useState('');
  return (
    <form
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
      />
      <Button type='submit' fullWidth variant='contained' color='primary'>
        {buttonText}
      </Button>
    </form>
  );
}

CreateNickName.defaultProps = {
  submit: () => {},
  error: '',
  buttonText: 'Default Button',
  text: 'Default Text',
};

CreateNickName.propTypes = {
  submit: PropTypes.func,
  error: PropTypes.string,
  buttonText: PropTypes.string,
  text: PropTypes.string,
};
