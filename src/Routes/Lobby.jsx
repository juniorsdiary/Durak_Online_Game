import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { setUsersData, setRoomsData } from 'Store';
import { PlayersData, ChatSection, AvailableRooms, Password, Settings } from 'Components';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  main: {
    padding: '0',
    flex: '1',
    overflow: 'hidden',
    wrap: 'nowrap',
  },
  content: {
    height: '100%',
    justifyContent: 'space-between',
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

  handleResult = ({ error, roomName, messageIndex }) => {
    const { setError, handleSettingsModal, handlePasswordModal } = this.props;
    if (error) {
      setError({ error, messageIndex });
    } else {
      setError({ error: false });
      handleSettingsModal(false);
      handlePasswordModal(false);
      this.joinRoom(roomName);
    }
  };

  checkRoomsData = settings => {
    const { socket } = this.props;
    socket.emit('createRoom', settings, this.handleResult);
  };

  checkAccess = (roomName, access) => {
    const { handlePasswordModal, setAccessRoom } = this.props;
    if (access === 'Private') {
      handlePasswordModal(true);
      setAccessRoom(roomName);
    } else {
      this.joinRoom(roomName);
    }
  };

  checkPass = pass => {
    const { socket, accessRoom } = this.props;
    socket.emit('checkPassWord', accessRoom, pass, this.handleResult);
  };

  joinRoom = roomName => {
    const { joinRoom, socket, userData } = this.props;
    socket.emit('joinRoom', roomName, userData.user);
    joinRoom(roomName);
  };

  render() {
    const { users, socket, classes, rooms, isInRoom, handleSettingsModal, handlePasswordModal, settingsModal, passwordModal } = this.props;
    if (isInRoom) {
      return <Redirect to={`/room/${isInRoom}`} />;
    }
    return (
      <Grid container direction='column' className={classes.main}>
        <Grid container direction='row' className={classes.content}>
          <PlayersData users={users} />
          <ChatSection socket={socket} />
          <AvailableRooms rooms={rooms} openSettings={handleSettingsModal} checkAccess={this.checkAccess} />
          <Settings open={settingsModal} handleSettingsModal={handleSettingsModal} checkRoomsData={this.checkRoomsData} />
          <Password open={passwordModal} onClose={handlePasswordModal} checkPass={this.checkPass} />
        </Grid>
      </Grid>
    );
  }
}

Lobby.propTypes = {
  isInRoom: PropTypes.string,
  accessRoom: PropTypes.string,
  settingsModal: PropTypes.bool,
  passwordModal: PropTypes.bool,
  users: PropTypes.array,
  rooms: PropTypes.array,
  socket: PropTypes.object,
  classes: PropTypes.object,
  userData: PropTypes.object,
  setError: PropTypes.func,
  joinRoom: PropTypes.func,
  setAccessRoom: PropTypes.func,
  setAvailableRooms: PropTypes.func,
  setConnectedUsers: PropTypes.func,
  handleSettingsModal: PropTypes.func,
  handlePasswordModal: PropTypes.func,
};

const mapStateToProps = state => ({
  socket: state.authentication.socket,
  isInRoom: state.authentication.isInRoom,
  users: state.commonData.usersData,
  rooms: state.commonData.roomsData,
  userData: state.commonData.userData,
  settingsModal: state.commonData.settingsModal,
  passwordModal: state.commonData.passwordModal,
  accessRoom: state.commonData.accessRoom,
});

const mapDispatchToProps = dispatch => ({
  setConnectedUsers: data => {
    dispatch(setUsersData(data));
  },
  setAvailableRooms: data => {
    dispatch(setRoomsData(data));
  },
  joinRoom: roomName => {
    dispatch({ type: 'SET_ROOM_NAME', payload: roomName });
  },
  setError: data => {
    dispatch({ type: 'SET_ERROR', payload: data });
  },
  handlePasswordModal: value => {
    dispatch({ type: 'SET_PASSWORD_MODAL', payload: value });
  },
  handleSettingsModal: value => {
    dispatch({ type: 'SET_SETTINGS_MODAL', payload: value });
  },
  setAccessRoom: roomName => {
    dispatch({ type: 'SET_ACCESS_ROOM', payload: roomName });
  },
});

const StyledReactComponent = withStyles(styles)(Lobby);

const ReduxConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(StyledReactComponent);

export default ReduxConnected;
