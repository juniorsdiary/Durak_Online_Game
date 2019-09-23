import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography, Button, Container, Paper, Grow } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  wrapper: {
    margin: theme.spacing(2, 0),
    padding: theme.spacing(1),
  },
  container: {
    padding: 0,
  },
  title: {
    fontWeight: 'bold',
    paddingRight: '0.5em',
  },
}));

const Room = ({ room, settings, users, checkAccess, textData }) => {
  const classes = useStyles();
  return (
    <Grow in={true}>
      <Grid component={Paper} container direction='column' alignItems='center' className={classes.wrapper}>
        <Container className={classes.container}>
          <Typography display='inline' className={classes.title}>
            {`${textData[16]}:`}
          </Typography>
          <Typography display='inline'>{room}</Typography>
        </Container>
        <Container className={classes.container}>
          <Typography display='inline' className={classes.title}>
            {`${textData[17]}:`}
          </Typography>
          <Typography display='inline'>{settings.cards}</Typography>
        </Container>
        <Container className={classes.container}>
          <Typography display='inline' className={classes.title}>
            {`${textData[18]}:`}
          </Typography>
          <Typography display='inline'>
            {users.length}/{settings.players}
          </Typography>
        </Container>
        <Button variant='contained' color='primary' size='small' onClick={() => checkAccess(room, settings.access)}>
          {`${textData[19]}`}
        </Button>
      </Grid>
    </Grow>
  );
};

Room.propTypes = {
  room: PropTypes.string,
  settings: PropTypes.object,
  users: PropTypes.array,
  checkAccess: PropTypes.func,
  textData: PropTypes.array,
};

export default Room;
