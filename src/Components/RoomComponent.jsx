import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography, Button, Container } from '@material-ui/core';

const RoomComponent = ({ room, settings, users }) => {
  return (
    <Grid container direction='column' alignItems='center'>
      <Container>
        <Typography display='inline' color='textSecondary'>
          Room name:{' '}
        </Typography>
        <Typography display='inline'>{room}</Typography>
      </Container>
      <Container>
        <Typography display='inline' color='textSecondary'>
          Number of Cards:{' '}
        </Typography>
        <Typography display='inline'>{settings[2]}</Typography>
      </Container>
      <Container>
        <Typography display='inline' color='textSecondary'>
          Players:{' '}
        </Typography>
        <Typography display='inline'>
          {users.length}/{settings[1]}
        </Typography>
      </Container>
      <Button variant='contained' color='primary' size='small'>
        Join
      </Button>
    </Grid>
  );
};

RoomComponent.propTypes = {
  room: PropTypes.string,
  settings: PropTypes.array,
  users: PropTypes.array,
};

export default RoomComponent;
