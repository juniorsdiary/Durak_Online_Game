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
