import React from 'react';
import PropTypes from 'prop-types';
import { ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@material-ui/core';
const UserCard = ({ id, name, room }) => {
  return (
    <ListItem dense>
      <ListItemText primary={name} secondary={room} />
      <ListItemSecondaryAction>
        <IconButton edge='end' aria-label='invite' size='small'>
          Invite
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

UserCard.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  room: PropTypes.string,
};

export default UserCard;
