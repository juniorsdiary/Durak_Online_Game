import React, { Component } from 'react';
import { hot } from 'react-hot-loader/root';
import { createGlobalStyle } from 'styled-components';
import { normalize } from 'polished';
import Routes from './routes.jsx';

const Global = createGlobalStyle`
  ${normalize()};
  body {
    overflow-y: overlay;
  }
  * {
    margin: 0;
    padding: 0;
  }
`;

class App extends Component {
  render() {
    return (
      <>
        <Global />
        <Routes />
      </>
    );
  }
}

export default hot(App);
