import React, { Component } from 'react';
import PropTypes from 'prop-types';
import io from 'socket.io-client';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Grid, Typography } from '@material-ui/core';
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
  setUser = ({ error, userData, message }) => {
    const { setAuth, setUserData, setErrorMessage } = this.props;
    setErrorMessage(message);
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
    const { errorMessage, textData } = this.props;
    if (this.props.isAuthenticated) {
      return <Redirect to={'/lobby'} />;
    }
    return (
      <Grid container direction='column' justify='center' alignItems='center'>
        <Grid item xs={4}>
          <Typography component='h1' variant='h5' align='center'>
            {textData.logInPage[0]}
          </Typography>
          <CreateNickName
            buttonText={textData.logInPage[2]}
            text={textData.logInPage[1]}
            submit={this.handleSubmit}
            error={errorMessage}
          />
        </Grid>
      </Grid>
    );
  }
}

MainPage.propTypes = {
  isAuthenticated: PropTypes.bool,
  setAuth: PropTypes.func,
  socket: PropTypes.object,
  setSocket: PropTypes.func,
  setUserData: PropTypes.func,
  setErrorMessage: PropTypes.func,
  errorMessage: PropTypes.string,
  textData: PropTypes.object,
};

const mapStateToProps = state => ({
  isAuthenticated: state.authentication.isAuthenticated,
  socket: state.authentication.socket,
  errorMessage: state.authentication.errorMessage,
  textData: state.commonData.typography,
});

const mapDispatchToProps = dispatch => ({
  setAuth: value => {
    dispatch({ type: 'SET_AUTH', payload: value });
  },
  setUserData: data => {
    dispatch({ type: 'SET_USER_DATA', payload: data });
  },
  setErrorMessage: message => {
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
