import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { setUsersData, setRoomsData } from 'Store';
import { PlayersData, Header, ChatSection, AvailableRooms, PasswordComponent, SettingsComponent } from 'Components';
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
  state = {
    openPassword: false,
    openSettings: false,
    requiredPassword: '',
    targetRoom: '',
  };

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
    const { socket, userData, joinRoom } = this.props;
    socket.emit('createRoom', { ...settings, nickname: userData.name });
    joinRoom(settings.roomname);
  };

  checkPassword = (roomname, password) => {
    if (password) {
      this.setState({
        openPassword: true,
        requiredPassword: password,
        targetRoom: roomname,
      });
    } else {
      this.joinRoom(roomname);
    }
  };

  joinRoom = roomname => {
    const { joinRoom, socket, userData } = this.props;
    socket.emit('joinRoom', roomname, userData.name);
    joinRoom(roomname);
  };

  signOut = nickname => {
    const { socket, signout } = this.props;
    socket.emit('signout', nickname);
    signout();
  };

  closePasswordModal = () => {
    this.setState({ openPassword: false });
  };

  handleSettingsModal = value => {
    this.setState({ openSettings: value });
  };

  render() {
    const { users, socket, classes, rooms, userData, isInRoom } = this.props;
    const { openSettings, openPassword, requiredPassword, targetRoom } = this.state;
    if (isInRoom) {
      return <Redirect to={`/room/${isInRoom}`} />;
    }
    return (
      <Grid container direction='column' className={classes.main} wrap='nowrap'>
        <Header userData={userData} signOut={this.signOut} />
        <Grid container direction='row' className={classes.content}>
          <PlayersData users={users} />
          <ChatSection socket={socket} />
          <AvailableRooms rooms={rooms} openSettings={this.handleSettingsModal} checkPassword={this.checkPassword} />
          <SettingsComponent open={openSettings} onClose={this.handleSettingsModal} createRoom={this.createRoom} />
          <PasswordComponent
            targetRoom={targetRoom}
            requiredPassword={requiredPassword}
            open={openPassword}
            onClose={this.closePasswordModal}
            joinRoom={this.joinRoom}
          />
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
  isInRoom: PropTypes.string,
  joinRoom: PropTypes.func,
};

const props = state => ({
  socket: state.authentication.socket,
  isInRoom: state.authentication.isInRoom,
  users: state.commonData.usersData,
  rooms: state.commonData.roomsData,
  userData: state.commonData.userData,
});

const boundedActions = dispatch => ({
  setConnectedUsers: data => {
    dispatch(setUsersData(data));
  },
  setAvailableRooms: data => {
    dispatch(setRoomsData(data));
  },
  joinRoom: roomname => {
    dispatch({ type: 'JOIN_ROOM', payload: roomname });
  },
  signout: () => {
    dispatch({ type: 'SET_AUTH', payload: false });
  },
});

const StyledReactComponent = withStyles(styles)(Lobby);

const ReduxConnected = connect(
  props,
  boundedActions
)(StyledReactComponent);

export default ReduxConnected;
