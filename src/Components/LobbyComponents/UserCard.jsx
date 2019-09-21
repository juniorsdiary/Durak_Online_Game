import React from 'react';
import PropTypes from 'prop-types';
import { ListItem, ListItemText } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
const useStyles = makeStyles({
  root: {
    '& span': {
      fontSize: '1.25rem',
      fontWeight: 'bold',
    },
  },
});
const UserCard = ({ user, room }) => {
  const classes = useStyles();
  return (
    <ListItem dense>
      <ListItemText primary={user} secondary={room} className={classes.root} />
    </ListItem>
  );
};

UserCard.propTypes = {
  user: PropTypes.string,
  room: PropTypes.string,
};

export default UserCard;
