import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, TextField } from '@material-ui/core';

export default function CreateNickName({ submit, error }) {
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
        label='Awesome nickname'
      />
      <Button type='submit' fullWidth variant='contained' color='primary'>
        Join Lobby
      </Button>
    </form>
  );
}

CreateNickName.propTypes = {
  submit: PropTypes.func,
  error: PropTypes.string,
};
