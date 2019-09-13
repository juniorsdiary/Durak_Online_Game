import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setUsersData } from 'Store';
import { PlayersData, Header } from 'Components';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  main: {
    background: 'red',
    height: '100vh',
  },
};

class Lobby extends Component {
  componentDidMount() {
    const { socket } = this.props;
    socket.on('displayPlayers', connectedUsers => {
      this.props.setConnectedUsers(connectedUsers);
    });
  }
  render() {
    const { users, socket, classes } = this.props;
    const curPlayer = users.find(item => item.id === socket.id);
    return (
      <Grid container className={classes.main}>
        <Header userData={curPlayer} />
        <PlayersData users={users} />
      </Grid>
    );
  }
}

Lobby.propTypes = {
  socket: PropTypes.object,
  setConnectedUsers: PropTypes.func,
  users: PropTypes.array,
  classes: PropTypes.object,
};

const StyledReactComponent = withStyles(styles)(Lobby);
const ReduxConnected = connect(
  state => ({ socket: state.socket, users: state.usersData }),
  dispatch => ({
    setConnectedUsers: data => {
      dispatch(setUsersData(data));
    },
  })
)(StyledReactComponent);

export default ReduxConnected;
