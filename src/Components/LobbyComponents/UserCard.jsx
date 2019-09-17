import React from 'react';
import PropTypes from 'prop-types';
import { ListItem, ListItemText } from '@material-ui/core';
const UserCard = ({ id, name, room }) => {
  return (
    <ListItem dense>
      <ListItemText primary={name} secondary={room} />
    </ListItem>
  );
};

UserCard.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  room: PropTypes.string,
};

export default UserCard;
