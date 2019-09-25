import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  form: {
    position: 'relative',
    margin: 'auto',
  },
});

const CreateNickName = ({ submit, error }) => {
  const [nickname, setNickname] = useState('');
  const classes = useStyles();
  const textData = useSelector(state => state.commonData.typography.logInPage);
  return (
    <>
      <Grid
        component='form'
        container
        direction='column'
        alignItems='center'
        className={classes.form}
        onSubmit={e => {
          e.preventDefault();
          submit(nickname);
        }}>
        <TextField
          id='nickname'
          name='nickname'
          label={textData[1] || 'Awesome nickname'}
          required
          autoComplete='off'
          error={!!error}
          value={nickname}
          onChange={e => setNickname(e.target.value)}
          variant='outlined'
          margin='normal'
        />
        <Button type='submit' variant='contained' color='primary'>
          {textData[2] || 'Join Lobby'}
        </Button>
      </Grid>
    </>
  );
};
CreateNickName.propTypes = {
  submit: PropTypes.func,
  error: PropTypes.string,
};

CreateNickName.defaultProps = {
  submit: () => {},
  error: '',
};

export default CreateNickName;
