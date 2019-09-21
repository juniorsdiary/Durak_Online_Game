import React from 'react';
import PropTypes from 'prop-types';
import { Grid, List, Container, ListItemText } from '@material-ui/core';
import { UserCard } from 'Components';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  wrapper: {
    maxHeight: '100%',
  },
  content: {
    padding: '0',
    height: '100%',
    overflow: 'auto',
  },
}));

const PlayersData = ({ users, text }) => {
  const classes = useStyles();
  const usersOnline = users.map(user => <UserCard key={user.id} {...user} />);
  return (
    <Grid item xs={4} className={classes.wrapper}>
      <Container className={classes.content}>
        <List>
          <ListItemText inset primary={`${text} ${users.length}`} />
          {usersOnline}
        </List>
      </Container>
    </Grid>
  );
};

PlayersData.propTypes = {
  users: PropTypes.array,
  text: PropTypes.string,
};

export default PlayersData;
