import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';
import { createGlobalStyle } from 'styled-components';
import { normalize } from 'polished';
import io from 'socket.io-client';

const Global = createGlobalStyle`
  ${normalize()};
  body {
    overflow-y: overlay;
    transition: all 0.2s linear;
  }
  :root {
    font-size: calc(0.5em + 0.6vw);
    font-family: "Segoe UI", Helvetica, Arial,sans-serif ;
  }
  ::before,
  ::after {
    box-sizing: inherit
  }
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  #container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

class MainPage extends Component {
  state = {
    nickname: null,
    socket: null,
    msg: '',
  };
  componentDidMount() {
    this.initSocket();
  }
  initSocket = () => {
    const socket = io();
    socket.emit('connected');
    socket.on('connected', msg => {
      this.setState({ msg: 'Connected' });
    });
    this.setState({ socket });
  };
  render() {
    return (
      <>
        <Global />
        <Switch>
          <Route path='/' render={() => <div>{this.state.msg}</div>} />
        </Switch>
      </>
    );
  }
}

export default hot(MainPage);
