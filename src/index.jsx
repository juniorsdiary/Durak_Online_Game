import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { store, history } from 'Store';

import './styles/styles.scss';

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>Hello</div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('container')
);
