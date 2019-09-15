import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { SettingsComponent, RoomComponent } from 'Components';
import { Grid, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  wrapper: {
    padding: '0 1em',
    height: '100%',
  },
  content: {
    padding: '0',
    height: '88%',
    overflow: 'auto',
  },
});

const AvailableRooms = ({ rooms, createRoom }) => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const renderRooms = rooms.map((room, i) => <RoomComponent key={i} {...room} />);
  return (
    <Grid item xs={4}>
      <Grid container direction='column' alignItems='center' className={classes.wrapper}>
        <Typography align='center' variant='h4'>
          Avalable Rooms
        </Typography>
        <Grid container direction='column' spacing={1} className={classes.content}>
          {renderRooms}
        </Grid>
        <Button variant='contained' color='primary' margin='normal' onClick={() => setOpen(true)}>
          Create Room
        </Button>
        <SettingsComponent open={open} onClose={setOpen} createRoom={createRoom} />
      </Grid>
    </Grid>
  );
};

AvailableRooms.propTypes = {
  createRoom: PropTypes.func,
  rooms: PropTypes.array,
};

export default AvailableRooms;
