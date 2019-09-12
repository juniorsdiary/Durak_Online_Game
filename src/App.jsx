import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';
import { createGlobalStyle } from 'styled-components';
import { normalize } from 'polished';

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

const App = () => {
  return (
    <>
      <Global />
      <Switch>
        <Route path='/' render={() => <div>Home</div>} />
      </Switch>
    </>
  );
};

export default hot(App);
