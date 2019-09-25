import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { store, history } from 'Store';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import App from './App.jsx';

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <DndProvider backend={HTML5Backend}>
        <App />
      </DndProvider>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('container')
);
