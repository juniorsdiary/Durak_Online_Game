import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { AppBar, Typography, Button, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  greet: {
    margin: theme.spacing(1),
  },
}));

const Header = ({ userData, signOut }) => {
  const classes = useStyles();
  const handleSignOut = useCallback(() => {
    signOut(userData.user);
  }, [signOut, userData.user]);
  return (
    <AppBar position='relative'>
      <Grid container justify='space-between' direction='row' alignItems='center'>
        <Typography className={classes.greet}>Hello, {userData.user}</Typography>
        <Button
          variant='contained'
          color='secondary'
          margin='normal'
          className={classes.button}
          onClick={handleSignOut}>
          Sign out
        </Button>
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
