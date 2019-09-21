import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, Switch } from '@material-ui/core';

const ChangeLanguage = () => {
  const [checked, setChecked] = useState(true);
  const socket = useSelector(state => state.authentication.socket);
  const dispatch = useDispatch();
  useEffect(() => {
    socket.emit('changeLanguage', checked, dispatch);
    /* eslint-disable */
  }, [checked]);
  /* eslint-enable */
  return (
    <>
      <Grid item>RU</Grid>
      <Grid item>
        <Switch
          checked={checked}
          onChange={e => setChecked(e.target.checked)}
          value='RU'
          color='secondary'
          inputProps={{ 'aria-label': 'checkbox' }}
        />
      </Grid>
      <Grid item>ENG</Grid>
    </>
  );
};

ChangeLanguage.propTypes = {};

export default ChangeLanguage;
