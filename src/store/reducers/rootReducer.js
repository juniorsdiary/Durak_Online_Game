import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import authentication from './authentication';
import commonData from './dataReducer';

const rootReducer = history =>
  combineReducers({
    authentication,
    commonData,
    router: connectRouter(history),
  });

export default rootReducer;
