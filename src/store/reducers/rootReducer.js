import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import * as types from '../types';
import authentication from './authentication';
import commonData from './dataReducer';

function socket(state = {}, action) {
  if (action.type === types.SET_SOCKET) {
    return action.payload;
  }
  return state;
}

const rootReducer = history =>
  combineReducers({
    authentication,
    socket,
    commonData,
    router: connectRouter(history),
  });

export default rootReducer;
