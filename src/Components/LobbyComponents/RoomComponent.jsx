import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography, Button, Container, Paper } from '@material-ui/core';

const RoomComponent = ({ room, settings, users, checkPassword, textData }) => {
  return (
    <Grid component={Paper} container direction='column' alignItems='center'>
      <Container>
        <Typography display='inline' color='textSecondary'>
          {`${textData[15]}:`}
        </Typography>
        <Typography display='inline'>{room}</Typography>
      </Container>
      <Container>
        <Typography display='inline' color='textSecondary'>
          {`${textData[16]}:`}
        </Typography>
        <Typography display='inline'>{settings.cards}</Typography>
      </Container>
      <Container>
        <Typography display='inline' color='textSecondary'>
          {`${textData[17]}:`}
        </Typography>
        <Typography display='inline'>
          {users.length}/{settings.players}
        </Typography>
      </Container>
      <Button variant='contained' color='primary' size='small' onClick={() => checkPassword(room, settings.password)}>
        {`${textData[18]}`}
      </Button>
    </Grid>
  );
};

RoomComponent.propTypes = {
  room: PropTypes.string,
  settings: PropTypes.object,
  users: PropTypes.array,
  checkPassword: PropTypes.func,
  textData: PropTypes.array,
};

export default RoomComponent;
