import * as types from '../types';
const initialState = {
  isAuthenticated: false,
  isInRoom: '',
  socket: {},
};
export default function authentication(state = initialState, action) {
  const { type, payload } = action;
  if (type === types.SET_AUTH) {
    return {
      ...state,
      isAuthenticated: payload,
    };
  } else if (type === types.SET_SOCKET) {
    return { ...state, socket: payload };
  } else if (type === types.SIGN_OUT) {
    return {
      ...state,
      isAuthenticated: payload,
    };
  } else if (type === types.JOIN_ROOM) {
    return {
      ...state,
      isInRoom: payload,
    };
  }
  return state;
}
