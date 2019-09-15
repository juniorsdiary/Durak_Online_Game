import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setUsersData, setRoomsData } from 'Store';
import { PlayersData, Header, ChatSection, AvailableRooms } from 'Components';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  main: {
    padding: '0',
    height: '100vh',
  },
  content: {
    height: '677px',
  },
};

class Lobby extends Component {
  componentDidMount() {
    const { socket, setConnectedUsers, setAvailableRooms } = this.props;
    socket.on('displayPlayers', connectedUsers => {
      setConnectedUsers(connectedUsers);
    });
    socket.on('displayRooms', availableRooms => {
      setAvailableRooms(availableRooms);
    });
  }
  createRoom = settings => {
    const { socket, userData } = this.props;
    socket.emit('createRoom', { ...settings, nickname: userData.name });
  };
  signOut = nickname => {
    const { socket, signout } = this.props;
    socket.emit('signout', nickname);
    signout();
  };
  render() {
    const { users, socket, classes, rooms, userData } = this.props;
    return (
      <Grid container direction='column' className={classes.main} wrap='nowrap'>
        <Header userData={userData} signOut={this.signOut} />
        <Grid container direction='row' className={classes.content}>
          <PlayersData users={users} />
          <ChatSection socket={socket} />
          <AvailableRooms rooms={rooms} createRoom={this.createRoom} />
        </Grid>
      </Grid>
    );
  }
}

Lobby.propTypes = {
  socket: PropTypes.object,
  userData: PropTypes.object,
  setConnectedUsers: PropTypes.func,
  setAvailableRooms: PropTypes.any,
  users: PropTypes.array,
  rooms: PropTypes.array,
  classes: PropTypes.object,
  signout: PropTypes.func,
};

const StyledReactComponent = withStyles(styles)(Lobby);

const ReduxConnected = connect(
  state => ({ socket: state.socket, users: state.commonData.usersData, rooms: state.commonData.roomsData, userData: state.commonData.userData }),
  dispatch => ({
    setConnectedUsers: data => {
      dispatch(setUsersData(data));
    },
    setAvailableRooms: data => {
      dispatch(setRoomsData(data));
    },
    signout: () => {
      dispatch({ type: 'SIGN_OUT', payload: false });
    },
  })
)(StyledReactComponent);

export default ReduxConnected;
