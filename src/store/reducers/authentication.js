import * as types from '../types';

export default function authentication(state = false, action) {
  if (action.type === types.SET_AUTH) {
    return action.payload;
  }
  return state;
}
