import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Grid, Switch } from '@material-ui/core';
import { connect } from 'react-redux';

const ChangeLanguage = ({ changeLang, socket }) => {
  const [checked, setChecked] = useState(true);

  useEffect(() => {
    socket.emit('changeLanguage', checked, changeLang);
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

ChangeLanguage.propTypes = {
  changeLang: PropTypes.func,
  socket: PropTypes.object,
};
const mapStateToProps = state => ({
  socket: state.authentication.socket,
});

const mapDispatchToProps = dispatch => ({
  changeLang: data => {
    dispatch({ type: 'CHANGE_LANGUAGE', payload: data });
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangeLanguage);
