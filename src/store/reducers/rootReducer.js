import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import authentication from './authentication';

const rootReducer = history =>
  combineReducers({
    authentication,
    router: connectRouter(history),
  });

export default rootReducer;
