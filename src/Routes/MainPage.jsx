import React, { Component } from 'react';
import PropTypes from 'prop-types';
import io from 'socket.io-client';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { CreateNickName } from 'Components';

const port = 'http://localhost:8080';

class MainPage extends Component {
  componentDidMount() {
    this.initSocket();
  }
  initSocket = () => {
    const socket = io(port);
    this.props.setSocket(socket);
  };
  setUser = ({ error, userData, messageIndex }) => {
    const { setAuth, setUserData, setError } = this.props;
    setError({ error, messageIndex });

    if (!error) {
      setAuth(!error);
      setUserData(userData);
    }
  };
  handleSubmit = nickname => {
    const { socket } = this.props;
    socket.emit('authenticate', nickname, this.setUser);
  };

  render() {
    const { isAuthenticated } = this.props;
    return isAuthenticated ? <Redirect to={'/lobby'} /> : <CreateNickName submit={this.handleSubmit} />;
  }
}

MainPage.propTypes = {
  isAuthenticated: PropTypes.bool,
  socket: PropTypes.object,
  classes: PropTypes.object,
  setSocket: PropTypes.func,
  setUserData: PropTypes.func,
  setError: PropTypes.func,
  setAuth: PropTypes.func,
};

const mapStateToProps = state => ({
  isAuthenticated: state.authentication.isAuthenticated,
  socket: state.authentication.socket,
});

const mapDispatchToProps = dispatch => ({
  setAuth: value => {
    dispatch({ type: 'SET_AUTH', payload: value });
  },
  setUserData: data => {
    dispatch({ type: 'SET_USER_DATA', payload: data });
  },
  setError: message => {
    dispatch({ type: 'SET_ERROR', payload: message });
  },
  setSocket: socket => {
    dispatch({ type: 'SET_SOCKET', payload: socket });
  },
});

const ReduxConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(MainPage);

export default ReduxConnected;
