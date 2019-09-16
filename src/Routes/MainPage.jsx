import React, { Component } from 'react';
import PropTypes from 'prop-types';
import io from 'socket.io-client';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Grid, Typography } from '@material-ui/core';
import { CreateNickName } from 'Components';

class MainPage extends Component {
  state = {
    error: '',
  };
  componentDidMount() {
    this.initSocket();
  }
  initSocket = () => {
    const socket = io('http://localhost:8080');
    this.props.setSocket(socket);
  };
  setUser = ({ error, userData, errorMsg }) => {
    const { setAuth, setUserData } = this.props;
    if (error) {
      this.setState({ error: errorMsg });
    } else {
      this.setState({ error: errorMsg });
      setAuth(!error);
      setUserData(userData);
    }
  };
  handleSubmit = nickname => {
    const { socket } = this.props;
    socket.emit('authenticate', nickname, this.setUser);
  };

  render() {
    const { error } = this.state;
    if (this.props.isAuthenticated) {
      return <Redirect to={'/lobby'} />;
    }
    return (
      <Grid container direction='column' justify='center' alignItems='center'>
        <Grid item xs={4}>
          <Typography component='h1' variant='h5' align='center'>
            Create nickname
          </Typography>
          <CreateNickName submit={this.handleSubmit} error={error} />
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
};

export default connect(
  state => ({
    isAuthenticated: state.authentication.isAuthenticated,
    socket: state.authentication.socket,
  }),
  dispatch => ({
    setAuth: value => {
      dispatch({ type: 'SET_AUTH', payload: value });
    },
    setUserData: data => {
      dispatch({ type: 'SET_USER_DATA', payload: data });
    },
    setSocket: socket => {
      dispatch({ type: 'SET_SOCKET', payload: socket });
    },
  })
)(MainPage);
