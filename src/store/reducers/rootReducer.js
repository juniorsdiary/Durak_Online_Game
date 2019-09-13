import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import * as types from '../types';
import authentication from './authentication';
import usersData from './dataReducer';

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
    usersData,
    router: connectRouter(history),
  });

export default rootReducer;
