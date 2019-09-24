import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { AppBar, Typography, Button, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ChangeLanguage } from 'Components';

const useStyles = makeStyles(theme => ({
  button: {
    margin: '0 1em 0 auto',
  },
  greet: {
    margin: theme.spacing(1),
  },
}));

const Header = () => {
  const { socket, isAuthenticated } = useSelector(state => state.authentication);
  const userData = useSelector(state => state.commonData.userData);
  const { lobbyPage } = useSelector(state => state.commonData.typography);
  const dispatch = useDispatch();
  const classes = useStyles();
  const handleSignOut = useCallback(() => {
    socket.emit('signOut', userData.nickname);
    dispatch({ type: 'SET_AUTH', payload: false });
    dispatch({ type: 'SET_ROOM_NAME', payload: '' });
  }, [dispatch, socket, userData.nickname]);

  return (
    <AppBar position='relative'>
      <Grid container justify='flex-start' direction='row' alignItems='center' wrap='nowrap'>
        <Typography variant='h4' className={classes.greet}>
          Durak Online
        </Typography>
        {socket && <ChangeLanguage />}
        {isAuthenticated && (
          <Button variant='contained' color='secondary' margin='normal' className={classes.button} onClick={handleSignOut}>
            {lobbyPage[0]}
          </Button>
        )}
      </Grid>
    </AppBar>
  );
};

Header.propTypes = {
  userData: PropTypes.object,
  signOut: PropTypes.func,
};

Header.defaultProps = {
  userData: {
    id: 0,
    nickname: 'PlaceHolder NickName',
    room: 'PlaceHolder Room',
    connectTime: '',
  },
};

export default Header;
