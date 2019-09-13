import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { store, history } from 'Store';
import MainPage from './MainPage.jsx';

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <MainPage />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('container')
);
