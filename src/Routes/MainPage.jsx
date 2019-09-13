import React, { Component } from 'react';
import PropTypes from 'prop-types';
import io from 'socket.io-client';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, TextField, Container, Typography } from '@material-ui/core';
// import { makeStyles } from '@material-ui/core/styles';
// const useStyles = makeStyles(theme => ({
//   '@global': {
//     body: {
//       backgroundColor: theme.palette.common.white,
//     },
//   },
//   paper: {
//     marginTop: theme.spacing(8),
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//   },
//   avatar: {
//     margin: theme.spacing(1),
//     backgroundColor: theme.palette.secondary.main,
//   },
//   form: {
//     width: '100%', // Fix IE 11 issue.
//     marginTop: theme.spacing(1),
//   },
//   submit: {
//     margin: theme.spacing(3, 0, 2),
//   },
// }));

class MainPage extends Component {
  state = {
    nickname: '',
    socket: null,
  };
  componentDidMount() {
    this.initSocket();
  }

  initSocket = () => {
    const socket = io('http://localhost:8080');
    this.setState({ socket });
  };

  setUser = ({ isNickUsed }) => {
    const { nickname } = this.state;
    const { setAuth } = this.props;
    if (isNickUsed) {
      this.setState({ error: `Nick Name ${nickname} is used` });
    } else {
      this.setState({ error: '' });
      setAuth(!isNickUsed);
    }
  };
  handleChange = e => {
    let nickname = e.target.value;
    this.setState({ nickname });
  };
  handleSubmit = e => {
    e.preventDefault();
    const { nickname, socket } = this.state;
    socket.emit('authenticate', nickname, this.setUser);
  };

  render() {
    const { nickname } = this.state;
    if (this.props.isAuthenticated) return <Redirect to={'/lobby'} />;
    return (
      <Container component='main' maxWidth='xs'>
        <Typography component='h1' variant='h5' align='center'>
          Create nickname
        </Typography>
        <form noValidate onSubmit={this.handleSubmit}>
          <TextField
            onChange={this.handleChange}
            value={nickname}
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='nickname'
            name='nickname'
            label='Awesome nickname'
          />
          <Button type='submit' fullWidth variant='contained' color='primary'>
            Join Lobby
          </Button>
        </form>
      </Container>
    );
  }
}
MainPage.propTypes = {
  isAuthenticated: PropTypes.bool,
  setAuth: PropTypes.func,
};

export default connect(
  state => ({
    isAuthenticated: state.authentication,
  }),
  dispatch => ({
    setAuth: value => {
      dispatch({ type: 'SET_AUTH', payload: value });
    },
  })
)(MainPage);
