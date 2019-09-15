import * as types from '../types';

export default function authentication(state = false, action) {
  const { type, payload } = action;
  if (type === types.SET_AUTH) {
    return payload;
  } else if (type === types.SIGN_OUT) {
    return payload;
  }
  return state;
}
