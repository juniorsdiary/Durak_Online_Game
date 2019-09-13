import React from 'react';
import PropTypes from 'prop-types';
import { AppBar, Typography, Button, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  typo: {
    margin: theme.spacing(1),
  },
}));

const Header = ({ userData }) => {
  const classes = useStyles();
  return (
    <AppBar>
      <Grid container justify='space-between' direction='row' alignItems='center'>
        <Typography className={classes.typo}>Hello, {userData.name}</Typography>
        <Button variant='contained' color='secondary' margin='normal' className={classes.button}>
          Sign out
        </Button>
      </Grid>
    </AppBar>
  );
};

Header.propTypes = {
  userData: PropTypes.object,
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
