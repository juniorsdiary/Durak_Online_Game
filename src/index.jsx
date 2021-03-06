import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { store, history } from 'Store';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { Loader } from 'Components';
const App = React.lazy(() => import('./App.jsx'));

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <DndProvider backend={HTML5Backend}>
        <React.Suspense fallback={<Loader />}>
          <App />
        </React.Suspense>
      </DndProvider>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('container')
);
