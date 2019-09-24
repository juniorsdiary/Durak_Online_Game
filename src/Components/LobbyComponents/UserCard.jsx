import React from 'react';
import PropTypes from 'prop-types';
import { ListItem, ListItemText, Grow } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
const useStyles = makeStyles({
  root: {
    '& span': {
      fontSize: '1.25rem',
      fontWeight: 'bold',
    },
  },
});
const UserCard = ({ nickname, room }) => {
  const classes = useStyles();
  return (
    <Grow in={true}>
      <ListItem dense>
        <ListItemText primary={nickname} secondary={room} className={classes.root} />
      </ListItem>
    </Grow>
  );
};

UserCard.propTypes = {
  nickname: PropTypes.string,
  room: PropTypes.string,
};

export default UserCard;
