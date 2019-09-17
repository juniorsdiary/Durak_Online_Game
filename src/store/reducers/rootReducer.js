import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import authentication from './authentication';
import commonData from './dataReducer';
import playRoomData from './playRoomData';

const rootReducer = history =>
  combineReducers({
    authentication,
    commonData,
    playRoomData,
    router: connectRouter(history),
  });

export default rootReducer;
