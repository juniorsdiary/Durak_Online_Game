import { createStore, applyMiddleware } from 'redux';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
// import logger from 'redux-logger';
import rootReducer from './reducers/rootReducer';

export const history = createBrowserHistory();

const md = [routerMiddleware(history), thunk];

if (process.env.NODE_ENV === `development`) {
  // md.push(logger);
}

const store = createStore(rootReducer(history), composeWithDevTools(applyMiddleware(...md)));

export default store;
