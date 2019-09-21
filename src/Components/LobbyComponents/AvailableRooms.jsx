import React from 'react';
import PropTypes from 'prop-types';
import { RoomComponent } from 'Components';
import { Grid, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  wrapper: {
    padding: '0 1em',
    height: '100%',
  },
  content: {
    padding: '0',
    height: '93%',
    overflow: 'auto',
  },
});

const AvailableRooms = ({ rooms, checkPassword, openSettings, textData }) => {
  const classes = useStyles();
  const renderRooms = rooms.map((room, i) => <RoomComponent key={i} {...room} checkPassword={checkPassword} textData={textData} />);
  return (
    <Grid item xs={4}>
      <Grid container direction='column' alignItems='center' wrap='nowrap' className={classes.wrapper}>
        <Grid container direction='column' spacing={1} className={classes.content}>
          {renderRooms}
        </Grid>
        <Button variant='contained' color='secondary' margin='normal' onClick={() => openSettings(true)}>
          {textData[6]}
        </Button>
      </Grid>
    </Grid>
  );
};

AvailableRooms.propTypes = {
  openSettings: PropTypes.func,
  rooms: PropTypes.array,
  checkPassword: PropTypes.func,
  textData: PropTypes.array,
};

export default AvailableRooms;
