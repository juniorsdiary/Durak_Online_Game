import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { setUsersData, setRoomsData } from 'Store';
import { PlayersData, ChatSection, AvailableRooms, PasswordComponent, SettingsComponent } from 'Components';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  main: {
    padding: '0',
    height: '100%',
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
    socket.emit('createRoom', { ...settings, nickname: userData.user });
    joinRoom(settings.roomName);
  };

  checkPassword = (roomName, password) => {
    if (password) {
      this.setState({
        openPassword: true,
        requiredPassword: password,
        targetRoom: roomName,
      });
    } else {
      this.joinRoom(roomName);
    }
  };

  joinRoom = roomName => {
    const { joinRoom, socket, userData } = this.props;
    socket.emit('joinRoom', roomName, userData.user);
    joinRoom(roomName);
  };

  closePasswordModal = () => {
    this.setState({ openPassword: false });
  };

  handleSettingsModal = value => {
    this.setState({ openSettings: value });
  };

  render() {
    const { users, socket, classes, rooms, isInRoom, textData } = this.props;
    const { openSettings, openPassword, requiredPassword, targetRoom } = this.state;
    if (isInRoom) {
      return <Redirect to={`/room/${isInRoom}`} />;
    }
    return (
      <Grid container direction='column' className={classes.main} wrap='nowrap'>
        <Grid container direction='row' className={classes.content}>
          <PlayersData users={users} text={textData[1]} />
          <ChatSection socket={socket} textData={textData} />
          <AvailableRooms
            textData={textData}
            rooms={rooms}
            openSettings={this.handleSettingsModal}
            checkPassword={this.checkPassword}
          />
          <SettingsComponent
            textData={textData}
            open={openSettings}
            onClose={this.handleSettingsModal}
            createRoom={this.createRoom}
          />
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
  setConnectedUsers: PropTypes.func,
  setAvailableRooms: PropTypes.any,
  users: PropTypes.array,
  rooms: PropTypes.array,
  classes: PropTypes.object,
  isInRoom: PropTypes.string,
  joinRoom: PropTypes.func,
  textData: PropTypes.array,
  userData: PropTypes.object,
};

const mapStateToProps = state => ({
  socket: state.authentication.socket,
  isInRoom: state.authentication.isInRoom,
  users: state.commonData.usersData,
  rooms: state.commonData.roomsData,
  textData: state.commonData.typography.lobbyPage,
});

const mapDispatchToProps = dispatch => ({
  setConnectedUsers: data => {
    dispatch(setUsersData(data));
  },
  setAvailableRooms: data => {
    dispatch(setRoomsData(data));
  },
  joinRoom: roomName => {
    dispatch({ type: 'JOIN_ROOM', payload: roomName });
  },
});

const StyledReactComponent = withStyles(styles)(Lobby);

const ReduxConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(StyledReactComponent);

export default ReduxConnected;