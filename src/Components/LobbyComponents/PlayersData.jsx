import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { UserCard } from 'Components';
import { makeStyles } from '@material-ui/core/styles';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
  wrapper: {
    maxHeight: '100%',
  },
  content: {
    padding: '0',
    height: '100%',
    overflow: 'auto',
  },
  listTitle: {
    padding: theme.spacing(0, 2),
  },
}));

const PlayersData = ({ users }) => {
  const classes = useStyles();
  const title = useSelector(state => state.commonData.typography.lobbyPage[1]);
  const usersOnline = users.map(user => <UserCard key={user.id} {...user} />);
  return (
    <Grid item xs={2} className={classes.wrapper}>
      <Paper className={classes.content}>
        <List>
          <ListItemText className={classes.listTitle} primary={`${title} ${users.length}`} />
          {usersOnline}
        </List>
      </Paper>
    </Grid>
  );
};

PlayersData.propTypes = {
  users: PropTypes.array,
};

export default PlayersData;
