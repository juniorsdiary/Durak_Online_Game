import React from 'react';
import PropTypes from 'prop-types';
import { ListItem, ListItemText } from '@material-ui/core';
const UserCard = ({ user, room }) => {
  return (
    <ListItem dense>
      <ListItemText primary={user} secondary={room} />
    </ListItem>
  );
};

UserCard.propTypes = {
  user: PropTypes.string,
  room: PropTypes.string,
};

export default UserCard;
